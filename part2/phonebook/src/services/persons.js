import axios from 'axios'

// because we are exporting the front end as a production build and both backend and frontend are
// served from the same address, we can declare baseUrl as a relative URL.
const baseUrl = '/api/persons'
// const baseUrl = 'https://ndeamador-fso2020-phonebook.herokuapp.com/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
      const request = axios.delete(`${baseUrl}/${id}`)
      return request.then(res => res.data)
}



// export default {
//     getAll: getAll,
//     create: create,
//     update: update,
//     deleteContact: deleteContact
// }

export default { getAll, create, update, deleteContact }