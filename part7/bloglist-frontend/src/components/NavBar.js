import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loginReducer'
import { AppBar, Toolbar, Button } from '@material-ui/core'


const NavBar = () => {

  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

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


  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          users
        </Button>
        <div> - User {user.name} logged in - <Button type="submit" onClick={handleLogout}>logout</Button></div>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar