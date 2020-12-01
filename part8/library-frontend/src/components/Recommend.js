import React, { useEffect } from "react"
import { CURRENT_USER, CURRENT_USER_RECOMMENDATIONS } from "../queries"
import { useLazyQuery, useQuery } from "@apollo/client"

const Recommend = ({ show, token }) => {

  // There seems to be a bug with the onCompleted method in the current version of Apollo. Adding the fetchpolicy "cache-and-network" serves as a workaround.
  // Without it, the application does not work properly or breaks when changing users.
  const [getCurrentUser, { loading: userLoading, data: userData }] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: "cache-and-network",
    onCompleted: data => {
      getRecommendations({ variables: { favoriteGenre: data.me.favoriteGenre } })
    }
  })

  const [getRecommendations, { loading: booksLoading, data: booksData }] = useLazyQuery(CURRENT_USER_RECOMMENDATIONS)

  // The effect hooks triggers when the authentication token changes (when the user logs in)
  useEffect(() => {
    if (token) getCurrentUser()
  }, [token])



  if (!show) {
    return null
  }

  const BookTable = () => {
    return (
      <div>
        <h2>recommendations</h2>
        <div>
          books in your favorite genre <strong>{userData.me.favoriteGenre}</strong>
        </div>

        {booksData.allBooks.length === 0 ?
          <p>No books found for genre "{userData.me.favoriteGenre}"</p>
          :
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {booksData.allBooks.map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>
    )
  }

  return userLoading || booksLoading ? <p>loading...</p> : <BookTable />
}

export default Recommend