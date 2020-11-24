import { createStore, combineReducers } from 'redux'
import blogFormReducer from './reducers/blogFormReducer'
import toggleableReducer from './reducers/toggleableReducer'
import loginReducer from './reducers/loginReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  blogFields: blogFormReducer,
  toggleableVisibility: toggleableReducer,
  login: loginReducer,
  // blogs: blogsReducer
})

const store = createStore (reducer)

store.subscribe(() => console.log(store.getState()))

export default store