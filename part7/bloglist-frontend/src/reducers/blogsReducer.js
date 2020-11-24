import blogService from '../services/blogs'


const reducer = (state = [], action) => {
  switch (action.type) {

    case 'INITIALIZE_BLOGS':
      return action.data

    case 'ADD_BLOG':
      return state.concat(action.data)

    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)

    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)

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

export const updateBlog = (blogId, updatedBlog) => {

  return async dispatch => {
    const response = await blogService.update(blogId, updatedBlog)

    dispatch({
      type: 'UPDATE_BLOG',
      data: response
    })
  }
}


export const deleteBlog = (blogId) => {

  return async dispatch => {
    await blogService.deleteBlog(blogId)
    
    dispatch({
      type: 'DELETE_BLOG',
      data: blogId
    })
  }    
}


// const updateBlog = async (blogId, updatedBlog) => {
//   try {
//     const response = await blogService.update(blogId, updatedBlog)

//     setBlogs(blogs.map(blog => blog.id === blogId ? response : blog))

//   } catch (exception) {
//     dispatch(setNotification({ type: 'error', text: exception.response.data.error }))
//     // notificationTimeout()
//   }
// }

export default reducer