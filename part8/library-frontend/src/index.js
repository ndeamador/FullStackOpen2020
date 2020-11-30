import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from 'apollo-link-context'

// As some operations in the backend require an user to be logged in, we need to add the authentication header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('loggedLibraryappUser')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

// the client object defines how apollo connects to the server.
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // concatenate the new header and the httpLink.
  link: authLink.concat(httpLink)
})


// Wrapping the App wtih ApolloProvider makes the client accessible to all components.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)