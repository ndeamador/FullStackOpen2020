import React, { useState } from "react"
import { ALL_BOOKS } from "../queries"
import { useQuery } from "@apollo/client"

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)

  const response = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (response.loading) {
    return <div>loading...</div>
  }

  const books = response.data.allBooks

  // ES6 Sets are collections of values which only allow unique values.
  const uniqueGenres = [
    ...new Set(
      books.reduce((acc, book) => {
        return acc.concat(book.genres)
      }, [])
    ),
  ]

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {/* {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))} */}
          {books.map(book => ( genreFilter === null || book.genres.includes(genreFilter) ?
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
            : null
          ))}
        </tbody>
      </table>
      <div>
        {uniqueGenres.map((genre) => (
          <button key={genre} onClick={() => setGenreFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setGenreFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
