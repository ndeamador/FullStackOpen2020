const reducer = (state = {}, action) => {

  switch (action.type) {
    case 'CLEAR_BLOG_FORM':
      return {}
    default:
      return state
  }
}

export const clearBlogForm = () => {
  return {
    type: 'CLEAR_BLOG_FORM'
  }
}


export default reducer