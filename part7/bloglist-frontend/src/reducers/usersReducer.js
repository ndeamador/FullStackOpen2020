import userService from '../services/users'


const reducer = (state = null, action) => {
  switch (action.type) {

    case 'INITIALIZE_USERS':
      return action.data

    case 'ADD_BLOG_TO_USER':
      return state.map(user => user.id === action.data.userId ? { ...user, blogs: user.blogs.concat(action.data.newBlog) } : user)

    case 'REMOVE_BLOG_FROM_USER':
      return state.map(user => user.id === action.data.userId ? { ...user, blogs: user.blogs.filter(blog => blog.id !== action.data.blogId) } : user)

    default:
      return state
  }
}

export const initializeUsers = () => {

  return async dispatch => {
    const users = await userService.getAll()

    dispatch({
      type: 'INITIALIZE_USERS',
      data: users
    })
  }
}

export const addBlogToUser = (userId, newBlog) => {
  return {
    type: 'ADD_BLOG_TO_USER',
    data: { userId, newBlog }
  }
}

export const removeBlogFromUser = (userId, blogId) => {
  return {
    type: 'REMOVE_BLOG_FROM_USER',
    data: { userId, blogId }
  }
}

export default reducer