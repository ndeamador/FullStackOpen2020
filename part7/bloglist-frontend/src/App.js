import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, addBlog } from './reducers/blogsReducer'
import { setNotification, clearNotification } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ type: null, text: null })

  const dispatch = useDispatch()

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs(blogs)
  //   )
  // }, [])

  useEffect(() => {
    dispatch(initializeBlogs()) 
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




  // const notificationTimeout = () => {
  //   setTimeout(() => {
  //     setNotification(
  //       {
  //         type: null,
  //         text: null
  //       }
  //     )
  //   }, 5000)
  // }

  // const notificationTimeout = () => {
  //   setTimeout(() => {
  //     dispatch(setNotification(  {
  //       type: null,
  //       text: null
  //     }))
  //   }, 5000)
  // }



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

      dispatch(setNotification({ type: 'success', text: 'Login successful' }))
      // notificationTimeout()

    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: 'Wrong username or password' }))
      // notificationTimeout()
    }
  }



  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')

        dispatch(setNotification({ type: 'success', text: 'Successfully logged out' }))
        // notificationTimeout()
      } catch (exception) {
        dispatch(setNotification({ type: 'error', text: 'Unable to logout' }))
        // notificationTimeout()
      }
    }
  }



  // the useRef hook creates a ref that we will assign to the Toggleable component.
  // this variable acts as a reference to the component. The same reference is kept between re-renders
  const blogFormRef = useRef()

  // const addBlog = async (newObject) => {


  //   try {
  //     // close the form when the new blog is created by the user
  //     blogFormRef.current.toggleVisibility()

  //     const response = await blogService.create(newObject)

  //     // setBlogs(blogs.concat(response))
  //     dispatch(addBlog(response))

  //     dispatch(setNotification({ type: 'success', text: `Blog "${newObject.title}" added` }))
  //     notificationTimeout()


  //   } catch (exception) {
  //     setNotification({ type: 'error', text: exception.response.data.error })
  //     notificationTimeout()
  //   }
  // }


  const updateBlog = async (blogId, updatedBlog) => {
    try {
      const response = await blogService.update(blogId, updatedBlog)

      setBlogs(blogs.map(blog => blog.id === blogId ? response : blog))

    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: exception.response.data.error }))
      // notificationTimeout()
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)

      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: exception.response.data.error }))
      // notificationTimeout()
    }

  }




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
        <div>
          <h2>blogs</h2>
          <div id="logged-in-line">{user.name} logged in<button type="submit" onClick={handleLogout}>logout</button></div>

          <Toggleable buttonLabel1='new blog' buttonLabel2='cancel' ref={blogFormRef}>
            <BlogForm initial_state='hide' />
          </Toggleable>

          <BlogList blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
        </div>
      }

    </div>
  )
}

export default App