import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client'
import { setContext } from 'apollo-link-context'

// required for Apollo subscriptions (alongside split above)
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

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

// wsLink and splitLink are required for Apollo's subscriptions.
const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/graphql`,
  options: {
    reconnect: true
  }
})
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  // concatenate the new authentication header and the httpLink.
  authLink.concat(httpLink),
)

// the client object defines how apollo connects to the server.
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})


// Wrapping the App wtih ApolloProvider makes the client accessible to all components.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)