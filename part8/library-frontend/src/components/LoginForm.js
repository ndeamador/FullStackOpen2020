import React, { useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setToken, setError, setPage }) => {
  // useMutation returns a tuple, the first element is the mutation function to be called anywhere in the component, the second is an object with the current status of the mutation's execution.
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem("loggedLibraryappUser", token)
      setPage("books")
    }
  }, [result.data]) // eslint-disable-line

  if (!show) {
    return null
  }

  const submitLogin = async (event) => {
    event.preventDefault()

    // console.log(event.target);
    login({
      variables: {
        username: event.target.name.value,
        password: event.target.password.value,
      },
    })

    event.target.name.value = ""
    event.target.password.value = ""
  }

  return (
    <form onSubmit={submitLogin}>
      <div>
        name: <input name="name"></input>
      </div>
      <div>
        password: <input name="password" type="password"></input>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
