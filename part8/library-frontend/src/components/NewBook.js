import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries"

const NewBook = (props) => {
  const [title, setTitle] = useState("")
  const [author, setAuhtor] = useState("")
  const [published, setPublished] = useState("")
  const [genre, setGenre] = useState("")
  const [genres, setGenres] = useState([])

  // the useMutation hook returns an array, the result of the mutations being the first element.
  // we use the hookds 'refetchQueries' parameter to query allBooks(and allAuthors) again so that the changes are reflected without refreshing the page.
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message)
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const publishedToInt = parseInt(published)
    createBook({
      variables: { title, author, published: publishedToInt, genres },
    })

    setTitle("")
    setPublished("")
    setAuhtor("")
    setGenres([])
    setGenre("")
  }

  const addGenre = () => {
    if (genre !== "") {
      setGenres(genres.concat(genre))
    }
    setGenre("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
