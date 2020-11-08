import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: null, text: null })
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')





  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  // Effect hook for checking if there is a logged in user in the local storage when we enter the page.
  // If so, the details are saved to the app's state and to blogService
  // The empty array ensures that the effect is only executed when the component is rendered for the frist time.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const notificationTimeout = () => {
    setTimeout(() => {
      setNotification(
        {
          type: null,
          text: null
        }
      )
    }, 5000)
  }


  const handleLogin = async (event) => {
    // Prevent the default action of submitting the form (which would cause the page to reload).
    event.preventDefault()

    try {
      // username and password are the states above
      // the response (user) will be an object including name, username and token.
      const user = await loginService.login({
        username, password,
      })

      // Save token (the object containing token, username and name) to browser's local storage so that it's available between rerenders.
      // https://fullstackopen.com/en/part5/login_in_frontend#saving-the-token-to-the-browsers-local-storage
      // The value saved to local storage is a DOMstring, which need to be parsed to JSON (JSON.stringify) before saving and needs to be parsed back to JS when read (JSON.parse).
      // The parameters are a key-value pair, the first being the name of the key and the second the value
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      setNotification({ type: 'success', text: 'Login successful' })
      notificationTimeout()

    } catch (exception) {
      setNotification({ type: 'error', text: 'Wrong username or password' })
      notificationTimeout()
    }
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      try {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')

        setNotification({ type: 'success', text: 'Successfully logged out' })
        notificationTimeout()
      } catch (exception) {
        setNotification({ type: 'error', text: 'Unable to logout' })
        notificationTimeout()
      }
    }
  }

  const clearBlogFormFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newObject = {
        title,
        author,
        url
      }
      const response = await blogService.create(newObject)

      setBlogs(blogs.concat(response))

      setNotification({ type: 'success', text: `Blog "${title}" added` })
      notificationTimeout()
      // setTitle('')
      // setAuthor('')
      // setUrl('')
      clearBlogFormFields()

    } catch (exception) {
      setNotification({ type: 'error', text: 'Failed to add blog' })
      notificationTimeout()
    }
  }




  // const LoginForm = () => (
  //   <>
  //     <h2>Log in to application</h2>
  //     <form onSubmit={handleLogin}>
  //       <div>
  //         username
  //         <input
  //           type="text"
  //           value={username}
  //           name="Username"
  //           onChange={({ target }) => setUsername(target.value)}
  //         />
  //       </div>
  //       <div>
  //         password
  //         <input
  //           type="password"
  //           value={password}
  //           name="Password"
  //           onChange={({ target }) => setPassword(target.value)}
  //         />
  //       </div>
  //       <button type="submit">login</button>
  //     </form>
  //   </>
  // )

  // const blogForm = () => (
  //   <>
  //     <h2>create new</h2>
  //     <form onSubmit={addBlog}>
  //       <div>
  //         title
  //         <input
  //           type="text"
  //           name="title"
  //           value={title}
  //           onChange={({ target }) => setTitle(target.value)}
  //         />
  //       </div>
  //       <div>
  //         author
  //         <input
  //           type="text"
  //           name="author"
  //           value={author}
  //           onChange={({ target }) => setAuthor(target.value)}
  //         />
  //       </div>
  //       <div>
  //         url
  //         <input
  //           type="text"
  //           name="url"
  //           value={url}
  //           onChange={({ target }) => setUrl(target.value)}
  //         />
  //       </div>
  //       <button type="create">create</button>
  //     </form>
  //   </>
  // )

  // const blogList = () => {
  //   return (
  //     <>
  //       <h2>blogs</h2>
  //       <div id="logged-in-line">{user.name} logged-in<button type="submit" onClick={handleLogout}>logout</button></div>

  //       {
  //         blogs.map(blog =>
  //           <Blog key={blog.id} blog={blog} />
  //         )
  //       }
  //     </>
  //   )
  // }





  return (

    <div>

      <Notification message={notification} />

      {/* A react trick to render forms conditionally. If the first statement is false or falsy, the second statement -which generates the form- is not executed */}
      {/* user === null depends on an user being logged in or not */}
      {/* {user === null && LoginForm()}  */}
      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        /> :
        // LoginForm() :
        <div>
          {/* {blogForm()} */}
          {/* {blogList()} */}

          <BlogList user={user} blogs={blogs} handleLogout={handleLogout} />

          <Toggleable buttonLabel1='new note' buttonLabel2='cancel 'resetFormState={clearBlogFormFields}>

            <BlogForm
              initial_state='hide'
              title={title}
              author={author}
              url={url}
              handleTitleChange={({ target }) => setTitle(target.value)}
              handleAuthorChange={({ target }) => setAuthor(target.value)}
              handleUrlChange={({ target }) => setUrl(target.value)}
              handleSubmit={addBlog}
            />

            <div initial_state='show'>temporary solution</div>

          </Toggleable>
        </div>
      }


    </div>
  )
}

export default App