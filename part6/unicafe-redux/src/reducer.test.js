import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    // DO_NOTHING is not defined in the reducer, so it triggers the default action.
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    // The following command ensures that the reducer does not change the store state given as a parameter. 
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK'
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(
      {
        good: 0,
        ok: 1,
        bad: 0
      }
    )
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }

    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(
      {
        good: 0,
        ok: 0,
        bad: 1
      }
    )
  })

  test('zero resets the state', () => {

    const state = {
      good: 13,
      ok: 4,
      bad: 46
    }

    const action = {
      type: 'ZERO'
    }

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual(
      {
        good: 0,
        ok: 0,
        bad: 0
      }
    )
  })
})