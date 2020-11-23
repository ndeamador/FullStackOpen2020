import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleLogin }) => (

  <div className="login-form">
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          className="login-username-input"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          className="login-password-input"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button className="login-button" type="submit">login</button>
    </form>
  </div>
)



LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm