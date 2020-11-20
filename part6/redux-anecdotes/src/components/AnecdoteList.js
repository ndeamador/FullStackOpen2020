import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    // The hook useSelector allows a component to access the data in the store
    // The parameter is function that selects or searches data in the store. Since we want all our anecdotes, the selection function returns the whole state.
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    const filteredAnecdotes = orderedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()) === true)

    // The hook useDispatch providces the "store.dispatch" function (of the store defined in index.js) to any React component, so that they can make changes to the state. (state => {return state})
    const dispatch = useDispatch()



    const vote = (anecdote) => {
        dispatch(addVoteTo(anecdote))
        dispatch(setNotification(`you voted the anecdote:  '${anecdote.content}'`, 10))

        // note that calling timeouts in quick succession makes them overlap, so the first call might clear the last call notification ahead of the inteded tiem.
        // setTimeout(() => dispatch(clearNotification()), 5000)
    }

    return (
        <>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}


export default AnecdoteList