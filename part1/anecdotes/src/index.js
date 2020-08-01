import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const DisplayVotes = ({ votes }) => <div>has {votes} votes</div>


const App = (props) => {

  // get a random number from 0 to the total number of anecdotes
  const getRandomAnecdoteId = () => Math.floor(Math.random() * anecdotes.length)

  // Make the initial anecdote random as well.
  const [selected, setSelected] = useState(getRandomAnecdoteId())
  const [allVotes, setAll] = useState(new Array(anecdotes.length).fill(0))

  // Change anecdote state to a random one.
  const randomizeAnecdote = () => setSelected(getRandomAnecdoteId())

  // Clone votes array, add vote to selected anecdote and store allVotes updated state.
  const storeVote = () => {
    const tempVotesArray = [...allVotes];
    tempVotesArray[selected]++
    setAll(tempVotesArray)
  }

  const getHighestVotedAnecdote = () => {

    const highestVotedIndex = allVotes.indexOf(Math.max(...allVotes))

    return props.anecdotes[highestVotedIndex]
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <DisplayVotes votes={allVotes[selected]} />
      <div>
        <Button handleClick={storeVote} text='vote' />
        <Button handleClick={randomizeAnecdote} text='next anecdote' />
      </div>
      <h1>Anecdote with most votes</h1>
      {getHighestVotedAnecdote()}
    </div >
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)