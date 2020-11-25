
import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({toggleVisibility}) => {

  const dispatch = useDispatch()

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

      await dispatch(addBlog(newObject))

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
          title
          <input
            id="blogform-title-input"
            type="text"
            name="title"
          />
        </div>
        <div>
          author
          <input
            id="blogform-author-input"
            type="text"
            name="author"
          />
        </div>
        <div>
          url
          <input
            id="blogform-url-input"
            type="text"
            name="url"
          />
        </div>
        <button className="blogform-create-button" type="create">create</button>
      </form>
    </div>
  )
}

export default BlogForm