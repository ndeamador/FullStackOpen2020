// State
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}


// Reducer
// A reducer function takes the current state and an action and gives the new state.
// state = initialState defines the default value of the state parameter. Without it, the reducer would not work before the store state is printed.
// The reducer is never meant to be called from the application's code, it is only given as a parameter to the createStore function.
const counterReducer = (state = initialState, action) => {

  // In reducers it is customary to use swtich instead of ifs
  // We cannot directly change the state of the original object
  switch (action.type) {
    case 'GOOD':
      // return { good: state.good + 1, ok: state.ok, bad: state.bad }
      return { ...state, good: state.good + 1 }

    case 'OK':
      // return { good: state.good, ok: state.ok + 1, bad: state.bad }
      return { ...state, ok: state.ok + 1 }

    case 'BAD':
      // return { good: state.good, ok: state.ok, bad: state.bad + 1 }
      return { ...state, bad: state.bad + 1 }

    case 'ZERO':
      return initialState
    default: return state  
  }
  
}

export default counterReducer