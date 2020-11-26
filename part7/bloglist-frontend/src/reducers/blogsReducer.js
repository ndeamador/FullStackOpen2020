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

    case 'ADD_COMMENT':
      return state.map(blog => blog.id === action.data.id ? { ...blog, comments: [...blog.comments, action.data.message] } : blog)

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
  return async dispatch => {
    const response = await blogService.create(newObject)
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

export const addComment = (id, message) => {
  return async dispatch => {
    await blogService.addComment(id, message)
    dispatch({
      type: 'ADD_COMMENT',
      data: { id, message }
    })
  }
}

export default reducer