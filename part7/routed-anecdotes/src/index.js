import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// We can't have useRouteMatch in the component with defines the routed part of the app (the one with the <Router> tags), so we move the <Router> tags from App to index.js
import {BrowserRouter as Router} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'))