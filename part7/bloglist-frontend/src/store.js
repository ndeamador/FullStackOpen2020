import { createStore, combineReducers, applyMiddleware } from 'redux'
import toggleableReducer from './reducers/toggleableReducer'
import loginReducer from './reducers/loginReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  toggleableVisibility: toggleableReducer,
  user: loginReducer,
  blogs: blogsReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => console.log(store.getState()))

export default store