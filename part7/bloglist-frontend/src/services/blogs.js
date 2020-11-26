import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  // If the second parameter is an object, Axios sets the content-type header to application/json, but we can override it adding a different config to the third (options) parameter.
  // In this case, we only add the authorization header to the options parameter, with the token required by the backend to create new blogs.
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

// delete is a protected word in Javascript, so we have to find a different name for the handler.
const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (id, message) => {
  const formatedMessage = { message }
  const response = await axios.post(`${baseUrl}/${id}/comments`, formatedMessage)
  return response.data
}


export default { getAll, create, update, setToken, deleteBlog, addComment }