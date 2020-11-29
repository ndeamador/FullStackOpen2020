
import React from 'react'
import { SET_BIRTHYEAR, ALL_AUTHORS } from '../queries'
import { useQuery, useMutation } from '@apollo/client'




const Authors = (props) => {
  const response = useQuery(ALL_AUTHORS)

  const [setBirthyear] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  }

  if(response.loading) {
    return <div>loading...</div>
  }

  const authors = response.data.allAuthors

  const setAge = (event) => {
    event.preventDefault()
    setBirthyear({ variables: {author: event.target.name.value, birthYear: parseInt(event.target.year.value)}})
    event.target.name.value = ''
    event.target.year.value = null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>


      <form onSubmit={setAge}>
        <h2>Set birthyear</h2>
        <div>name <input name="name"></input></div>
        <div>born <input name="year" type="number"></input></div>
        <button type="submit">update author</button>
      </form>

    </div>
  )
}

export default Authors
