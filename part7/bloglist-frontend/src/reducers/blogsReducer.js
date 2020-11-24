import blogService from '../services/blogs'


const reducer = (state = [], action) => {
  switch (action.type) {

    case 'INITIALIZE_BLOGS':
      return action.data

    case 'ADD_BLOG':
      return state.concat(action.data)

    default: 
    return state
  }
}

export const initializeBlogs = () => {  
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: response
    })
  }
}

export const addBlog = (newObject) => {
  console.log('reducer addblog newobject:', newObject);
  return async dispatch => {
    const response = await blogService.create(newObject)
    console.log('response:', response);
    dispatch({
      type: 'ADD_BLOG',
      data: response
    })
  }

}

export default reducer