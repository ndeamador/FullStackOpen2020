import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import toggleableReducer from './reducers/toggleableReducer'
import loginReducer from './reducers/loginReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userViewReducer from './reducers/userViewReducer'


const reducer = combineReducers({
  toggleableVisibility: toggleableReducer,
  user: loginReducer,
  blogs: blogsReducer,
  notification: notificationReducer,
  users: userViewReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

store.subscribe(() => console.log(store.getState()))

export default store