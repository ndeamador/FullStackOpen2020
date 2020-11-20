import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'

// the connect method is outdated, but it's useful to understand it in case older code needs to be maintaned. It replaces dispatch and useSelector.
import { connect } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    // The hook useSelector allows a component to access the data in the store
    // The parameter is function that selects or searches data in the store. Since we want all our anecdotes, the selection function returns the whole state.
    // const anecdotes = useSelector(state => state.anecdotes)
    // const filter = useSelector(state => state.filter)

    const orderedAnecdotes = props.anecdotes.sort((a, b) => b.votes - a.votes)
    const filteredAnecdotes = orderedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(props.filter.toLowerCase()) === true)

    // The hook useDispatch providces the "store.dispatch" function (of the store defined in index.js) to any React component, so that they can make changes to the state. (state => {return state})
    // const dispatch = useDispatch()



    const vote = (anecdote) => {
        props.addVoteTo(anecdote)
        props.setNotification(`you voted the anecdote:  '${anecdote.content}'`, 10)
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}

// The functions passed here must be action creators.
// This is a regular JS object, in it's shorthand form (instead of addVoteTo: addVoteTo)
const mapDispatchToProps = {
    addVoteTo,
    setNotification
}

// Transform the AnecdoteList component into a "connected componet"
// mapStateToProps is similar to subscribe, it is called anytime the store is updated.
// the second parameter of connect, mapDispatchToProps, which groups the action creator functions passed to the connected component as props.
// connects modifies the functions returned by mapStateToProps to use dispatch, so we don't need to call it in our code.
const ConnectedAnecdoteList = connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList


// export default AnecdoteList