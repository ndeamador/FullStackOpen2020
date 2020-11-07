import axios from 'axios'
const baseUrl = '/api/login'

// the credentials are just the username and password sent from handleLogin() in app.js
const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)

  // the response includes name, username and token.
  return response.data
}

export default { login }