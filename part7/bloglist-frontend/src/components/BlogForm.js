import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@material-ui/core'
import { addBlogToUser } from '../reducers/usersReducer'

const BlogForm = ({ toggleVisibility }) => {

  const dispatch = useDispatch()
  const currentUserId = useSelector(store => store.user.id)

  const addNewBlog = async (event) => {
    event.preventDefault()

    const newObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    event.target.reset()

    try {
      toggleVisibility()
      const response = await dispatch(addBlog(newObject))
      // eslint-disable-next-line no-unused-vars
      const { user, comments, likes, ...formattedBlog } = response
      dispatch(addBlogToUser(currentUserId, formattedBlog))
      dispatch(setNotification({ type: 'success', text: `Blog "${newObject.title}" added` }))

    } catch (exception) {
      dispatch(setNotification({ type: 'error', text: exception.message }))
    }
  }


  return (
    <div className="blogform-container">
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          <TextField
            id="blogform-title-input"
            type="text"
            name="title"
            label="title"
          />
        </div>
        <div>
          <TextField
            id="blogform-author-input"
            type="text"
            name="author"
            label="author"
          />
        </div>
        <div>
          <TextField
            id="blogform-url-input"
            type="text"
            name="url"
            label="url"
          />
        </div>
        <Button id="blogform-create-button" variant="contained" color="primary" size="small" type="create">create</Button>
      </form>
    </div>
  )
}

export default BlogForm