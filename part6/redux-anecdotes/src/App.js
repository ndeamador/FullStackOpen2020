import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  // The hook useSelector allows a component to access the data in the store
  // The parameter is function that selects or searches data in the store. Since we want all our anecdotes, the selection function returns the whole state.
  const anecdotes = useSelector(state => state)

  // The hook useDispatch providces the "store.dispatch" function (of the store defined in index.js) to any React component, so that they can make changes to the state. (state => {return state})
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVoteTo(id))
  }


  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
  }


  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App