
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useSubscription } from "@apollo/client"
import { BOOK_ADDED, ALL_BOOKS } from './queries'



const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  // This effect hook checks if there is a login token in the local storage, and if so, renders the page in a logged in state when reloaded.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedLibraryappUser')
    if (loggedUserJSON) {
      setToken(loggedUserJSON)
    }
  }, [])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        setToken(null)
        localStorage.clear()
        // It's important to reset Apollo's cache after logout as some queries might have fetched data which is only meant to be accessed by logged in  users.
        client.resetStore()
        setPage('books')
      } catch (err) {
        setErrorMessage('Unable to logout')
      }
    }
  }

  // Update the cache when the subscription sends an update
  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`Book ${addedBook.title} has been added.`)
      updateCacheWith(addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token? <button onClick={() => setPage('add')}>add book</button> : null}
        {token? <button onClick={() => setPage('recommend')}>recommend</button> : null}
        <button onClick={token ? handleLogout : () => setPage('login')}>{token? 'logout' : 'login'}</button>
      </div>
      <Notification errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommend
        show={page === 'recommend'}
        token={token}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />


    </div>
  )
}

export default App