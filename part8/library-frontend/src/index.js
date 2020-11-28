import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
})


// Wrapping the App wtih ApolloProvider makes the client accessible to all components.
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)