import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

// delete is a protected word in Javascript, so we have to find a different name for the handler.
// const deleteBlog = id => {
//   const config = {
//     headers: { Authorization: token },
//   }
  
//   const request = axios.delete(`${baseUrl}/${id}`, config)
//   return request.then(response => response.data)
// }

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}


export default { getAll, create, update, setToken, deleteBlog }