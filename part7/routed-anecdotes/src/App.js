import React, { useState } from 'react'
import {
  Switch, Route, Link, useHistory, useRouteMatch
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  )
}

const Anecdote = ({ anecdote }) => {
  // The useParams() method imported from react-router lets us access the id from the url (for instance: /anecdotes/3)
  // const id = useParams().id
  // Both the id extracted from the url and the id field in the "database" anecdotes are strings. If the id  in the database were a number, we would have to transform the url id for the comparison (Number(id))
  // const anecdote = anecdotes.find(anecdote => anecdote.id === id)

  return (
    <div>
      <h2><strong>{anecdote.content}</strong></h2>
      <div>Author:  {anecdote.author}</div>
      <div>url:  {anecdote.info}</div>
      <div>Votes:  {anecdote.votes}</div>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
    Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
    such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  // const [contentReset, ...content] = useField('content')
  // const [authorReset, ...author] = useField('author')
  // const [infoReset, ...info] = useField('info')

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  // console.log('reset:', contentReset)
  console.log('content:', content);

  const reset = () => {
    // contentReset()
    // authorReset()
    // infoReset()
  }

  // With the useHistory hook we can access the history object, which lets us modify the browser's url programatically. We will use it later to show the home page after creating a new anecdote.
  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    // Pass a new temporary notification to be temporarily displayed in the homepage.
    props.stateSetter(`New anecdote "${content.value}" created!`)
    setTimeout(() => props.stateSetter(''), 10000)

    // Go back to the homepage after creating a new note
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
      </form>
      <button onClick={() => reset()}>reset</button>
    </div>
  )

}

const Notification = ({ text }) => { return <div>{text}</div> }


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }


  // everytime the comopnent is rendered (when the browser url changes) the useRouteMatch('/anecdotes/:id') is executed
  // if the url in the browser is matching, the match variable is assigned an object containing the parametrized part of the path, including the id of the anecdote to be displayed.
  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anecdote => anecdote.id === match.params.id)
    : null

  return (
    // Rendering our components as children of the Router (BrowserRouter) tag imported by react-router-dom lets us handle dynamic routing.
    // Browse router uses the HTML5 API to be able to modify the website's url without refreshing the page: https://css-tricks.com/using-the-html5-history-api/
    // <Router> //moved to index, as we cannot use useRouteMatch in the same component that handles the routing.
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification text={notification} />

      {/* The order of the components in the switch is important, we have to put "/" last because all paths start with / and otherwise nothing would get rendered. Same goes with /notes and /notes/:id */}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} stateSetter={setNotification} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
    // </Router > // moved to index
  )
}

export default App;
