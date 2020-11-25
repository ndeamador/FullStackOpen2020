import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    // Prevent the default action of submitting the form (which would cause the page to reload).
    event.preventDefault()

    try {
      // username and password are the states above
      // the response (user) will be an object including name, username and token.
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      })

      // Save token (the object containing token, username and name) to browser's local storage so that it's available between rerenders.
      // https://fullstackopen.com/en/part5/login_in_frontend#saving-the-token-to-the-browsers-local-storage
      // The value saved to local storage is a DOMstring, which need to be parsed to JSON (JSON.stringify) before saving and needs to be parsed back to JS when read (JSON.parse).
      // The parameters are a key-value pair, the first being the name of the key and the second the value
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      dispatch(setUser(user))

      dispatch(setNotification({ type: 'success', text: 'Login successful' }))

    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: 'Wrong username or password' }))
    }
  }

  return (

    <div className="login-form">
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            className="login-username-input"
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <input
            className="login-password-input"
            type="password"
            name="password"
          />
        </div>
        <button className="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm