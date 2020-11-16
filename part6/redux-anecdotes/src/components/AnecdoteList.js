import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    // The hook useSelector allows a component to access the data in the store
    // The parameter is function that selects or searches data in the store. Since we want all our anecdotes, the selection function returns the whole state.
    const anecdotes = useSelector(state => state)
    const orderedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

    // The hook useDispatch providces the "store.dispatch" function (of the store defined in index.js) to any React component, so that they can make changes to the state. (state => {return state})
    const dispatch = useDispatch()


    const vote = (id) => {
        dispatch(addVoteTo(id))
    }

    return (
        <>
            {orderedAnecdotes.map(anecdote =>
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
        </>
    )
}


export default AnecdoteList