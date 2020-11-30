
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { useApolloClient } from "@apollo/client"



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
        // window.localStorage.removeItem('logged-libraryApp-user')
        localStorage.clear()
        // It's important to reset Apollo's cache after logout as some queries might have fetched data which is only meant to be accessed by logged in  users.
        client.resetStore()
      } catch (err) {
        setErrorMessage('Unable to logout')
      }
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token? <button onClick={() => setPage('add')}>add book</button> : null}
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