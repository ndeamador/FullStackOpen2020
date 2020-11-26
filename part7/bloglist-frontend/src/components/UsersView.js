
import React from 'react'
import { useSelector } from 'react-redux'


const UsersView = () => {

  const users = useSelector(store => store.users)
  console.log('usersview users', users);
  let usersRows = users ? users.map(user => (<tr key={user.username}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)) : null


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

export default UsersView