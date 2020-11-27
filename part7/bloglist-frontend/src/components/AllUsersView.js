
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const AllUsersView = () => {

  const users = useSelector(store => store.allUsers)
  const usersRows = users ? users.map(user => (<tr key={user.username}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>)) : null

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {usersRows}
        </tbody>
      </table>
    </div>
  )
}

export default AllUsersView