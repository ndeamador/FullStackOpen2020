import deepFreeze from 'deep-freeze'
import anecdoteReducer, { addVoteTo, createAnecdote } from './anecdoteReducer'

describe('Anecdote reducer', () => {
    const initialState = [
        {
            content: 'test anecdote 1',
            id: 42,
            votes: 0
        },
        {
            content: 'test anecdote 2',
            id: 31,
            votes: 0
        }
    ]

    test('state not being mutated on vote', () => {

        const state = initialState

        deepFreeze(state)
        const newState = anecdoteReducer(state, addVoteTo(31))
        expect(newState).toEqual([
            {
                content: 'test anecdote 1',
                id: 42,
                votes: 0
            },
            {
                content: 'test anecdote 2',
                id: 31,
                votes: 1
            }
        ])

    })

    test('state not being mutated on anecdote creation', () => {

        const state = initialState

        deepFreeze(state)
        anecdoteReducer(state, createAnecdote('testing mutability'))
    })
})