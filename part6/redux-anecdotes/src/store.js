import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    reducer,
    // composewithdevtools wires the app with the browser console extension
    // redux's compose allos to write deeply nested functions in a more readable way: https://stackoverflow.com/questions/41357897/understanding-compose-functions-in-redux#:~:text=From%20the%20Redux%20docs%3A,rightward%20drift%20of%20the%20code.
    // redux-thunk is a redux-middleware, and we have to initialize ith alongside the store.
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

store.subscribe(() => console.log(store.getState()))


export default store