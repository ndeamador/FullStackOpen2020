
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const SingleBlogView = () => {
  const id = useParams().id
  const blogs = useSelector(store => store.blogs)
  const blog = blogs ? blogs.find(blog => blog.id === id) : null
  const user = useSelector(store => store.user)

  const dispatch = useDispatch()
  const history = useHistory()

  const addLike = async () => {
    try {
      const updatedBlog = {
        author: blog.author,
        likes: blog.likes + 1,
        title: blog.title,
        user: blog.user.id
      }

      await dispatch(updateBlog(blog.id, updatedBlog))

    } catch (err) {
      dispatch(setNotification({ type: 'error', text: err.message }))
    }
  }

  const confirmDeletion = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {

      try {
        await dispatch(deleteBlog(blog.id))
        history.push('/')
        dispatch(setNotification({ type: 'success', text: `Blog '${blog.title}' successfully deleted.` }))
      } catch (err) {
        dispatch(setNotification({ type: 'error', text: err.message }))
      }
    }
  }

  const createdByCurrentUser = user && blog ? (user.id === blog.user.id) : false

  const deleteButton = () => (
    <button className="blog-delete-button" onClick={confirmDeletion}>Delete blog</button>
  )

  const BlogDiv = () => {
    return (
      <div className="blog-content">
        <h2 className="blog-title-and-author"> {blog.title}, by {blog.author}</h2>
        <a className="url-line" href={blog.url}>{blog.url}</a>
        <div className="likes-line">likes: {blog.likes} <button onClick={addLike}>like</button></div>
        <div className="creator-line">Entry created by: {blog.user.name}</div>
        {/* The delete button is only shown if the current logged in user is the creator of the blog entry */}
        {createdByCurrentUser && deleteButton()}
      </div>
    )
  }

  return !blog ? 'Blog not found' : BlogDiv()
}

export default SingleBlogView