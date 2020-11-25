import React, { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import './App.css'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/loginReducer'



const App = () => {

  const user = useSelector(store => store.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  // Effect hook for checking if there is a logged in user in the local storage when we enter the page.
  // If so, the details are saved to the app's state and to blogService
  // The empty array ensures that the effect is only executed when the component is rendered for the frist time.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])


  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        dispatch(setUser(null))
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch(setNotification({ type: 'success', text: 'Successfully logged out' }))

      } catch (exception) {
        dispatch(setNotification({ type: 'error', text: 'Unable to logout' }))
      }
    }
  }


  // the useRef hook creates a ref that we will assign to the Toggleable component.
  // this variable acts as a reference to the component. The same reference is kept between re-renders
  const blogFormRef = useRef()


  return (
    <div>
      <Notification />

      {user === null ?
        <LoginForm /> :
        <div>
          <h2>blogs</h2>
          <div id="logged-in-line">{user.name} logged in<button type="submit" onClick={handleLogout}>logout</button></div>

          <Toggleable buttonLabel1='new blog' buttonLabel2='cancel' ref={blogFormRef}>
            <BlogForm initial_state='hide' toggleVisibility={() => blogFormRef.current.toggleVisibility()} />
          </Toggleable>

          <BlogList user={user} />
        </div>
      }
    </div>
  )
}

export default App