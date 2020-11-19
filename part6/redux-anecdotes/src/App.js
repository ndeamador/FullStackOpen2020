import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

    const dispatch = useDispatch()
    // The [dispatch] in the second argument of the effect hook makes it trigger only when there are changes to dispatch
    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [dispatch])



    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App