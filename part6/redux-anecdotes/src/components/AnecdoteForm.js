import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        // const newNote = await anecdoteService.createNew(anecdote)
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`You have created the anecdote:  '` + anecdote + `'`))
        setTimeout(() => dispatch(clearNotification()), 5000)

    }



    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </>
    )
}


export default AnecdoteForm