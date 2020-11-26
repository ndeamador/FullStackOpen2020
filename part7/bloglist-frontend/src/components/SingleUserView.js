import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const SingleUserView = () => {

  const id = useParams().id
  const users = useSelector(store => store.allUsers)
  const user = users ? users.find(user => user.id === id) : ''
  const userBlogs = user ? user.blogs.map((blog, i) => (<li key={i}>{blog.title}</li>)) : null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>

      <ul>
      {userBlogs === null || userBlogs.length === 0 ?  'No blogs found' : userBlogs}
      </ul>
    </div >
  )
}

export default SingleUserView