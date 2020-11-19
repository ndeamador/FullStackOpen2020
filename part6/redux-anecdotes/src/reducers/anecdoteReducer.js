import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_VOTE': {
            const id = action.data.id
            return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
        }

        case 'ADD_ANECDOTE':
            return state.concat(action.data)

        case 'INIT_ANECDOTES':
            return action.data

        default:
            return state
    }
}

// Action creators are defined with their own export commands
export const addVoteTo = (anecdote) => {

    const upvotedAnecdote = {...anecdote, votes: anecdote.votes + 1}

    // this dispatch is possible thanks to redux-thunk
    // "we return a function that redux=thunk will call and pass dispatch as an argument"
    return async dispatch => {
        const response = await anecdoteService.update(upvotedAnecdote)
        dispatch({
            type: 'ADD_VOTE',            
            data: response
        })
    }
}

export const createAnecdote = content => {

    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'ADD_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {

    // async implementation with redux-thunk. Only this inner function is an asynchronous action
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export default reducer