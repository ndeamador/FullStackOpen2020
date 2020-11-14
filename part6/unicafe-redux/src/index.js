import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

// The store uses the reducer to handle actions, which are sent to the store with its dispatch method.
// Dispatching an action is the only way of triggering a state change.
const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}


const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

// React does not automatically rerender the application when the store state changes, so we tie the rerender 
// to a subscribe function which is triggered anytime the store state is modified.
// we also have to call the renderApp() so that the first render of the website happens.
renderApp()
store.subscribe(renderApp)
