import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {

    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = ''
        // dispatch(createAnecdote(anecdote))
        // dispatch(setNotification(`You have created the anecdote:  '${anecdote}'`, 10))
        props.createAnecdote(anecdote)
        props.setNotification(`You have created the anecdote:  '${anecdote}'`, 10)
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


export default connect(
    null,
    { createAnecdote, setNotification }
)(AnecdoteForm)


// export default AnecdoteForm