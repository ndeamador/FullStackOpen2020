import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

    switch (action.type) {
        case 'ADD_VOTE': {
            const id = action.data.id
            const anectdoteToChange = state.find(anecdote => anecdote.id === id)
            const changedAnecdote = { ...anectdoteToChange, votes: anectdoteToChange.votes + 1 }
            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
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
export const addVoteTo = (id) => {
    return {
        type: 'ADD_VOTE',
        data: { id }
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