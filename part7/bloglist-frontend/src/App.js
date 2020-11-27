import React, { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import './App.css'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import AllUsersView from './components/AllUsersView'
import SingleUserView from './components/SingleUserView'
import SingleBlogView from './components/SingleBlogView'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/loginReducer'
import { Switch, Route } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'
import Container from '@material-ui/core/Container'
import NavBar from './components/NavBar'



const App = () => {

  const user = useSelector(store => store.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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

  // the useRef hook creates a ref that we will assign to the Toggleable component.
  // this variable acts as a reference to the component. The same reference is kept between re-renders
  const blogFormRef = useRef()


  return (
    <Container>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <NavBar />

          <h2>blog app</h2>

          <Switch>
            <Route path='/users/:id'>
              <SingleUserView />
            </Route>

            <Route path='/users'>
              <AllUsersView />
            </Route>

            <Route path='/blogs/:id'>
              <SingleBlogView />
            </Route>

            <Route path='/'>
              <Toggleable buttonLabel1='new blog' buttonLabel2='cancel' ref={blogFormRef}>
                <BlogForm initial_state='hide' toggleVisibility={() => blogFormRef.current.toggleVisibility()} />
              </Toggleable>

              <BlogList user={user} />
            </Route>
          </Switch>

        </div>
      }
    </Container>
  )
}

export default App