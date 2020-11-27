
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { updateBlog, deleteBlog, addComment } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Button, TextField } from '@material-ui/core'
import { removeBlogFromUser } from '../reducers/usersReducer'


const SingleBlogView = () => {
  const id = useParams().id
  const blogs = useSelector(store => store.blogs)
  const blog = blogs ? blogs.find(blog => blog.id === id) : null
  let comments = blog ? blog.comments : null
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
        dispatch(removeBlogFromUser(blog.user.id, blog.id))
        dispatch(setNotification({ type: 'success', text: `Blog '${blog.title}' successfully deleted.` }))
      } catch (err) {
        dispatch(setNotification({ type: 'error', text: err.message }))
      }
    }
  }

  const createdByCurrentUser = user && blog ? (user.id === blog.user.id) : false

  const deleteButton = () => (
    <Button variant="outlined" color="secondary" size="small" className="blog-delete-button" onClick={confirmDeletion}>Delete blog</Button>
  )

  const submitComment = (event) => {
    event.preventDefault()
    dispatch(addComment(id, event.target.comment.value))
    event.target.comment.value=''
  }

  const BlogDiv = () => {
    return (
      <div className="blog-content">
        <h2 className="blog-title-and-author"> {blog.title}, by {blog.author}</h2>
        <a className="url-line" href={blog.url}>{blog.url}</a>
        <div className="likes-line">likes: {blog.likes} <Button id="single-blog-like-button" variant="contained" color="primary" size="small" onClick={addLike}>like</Button></div>
        <div className="creator-line">Entry created by: {blog.user.name}</div>
        {/* The delete button is only shown if the current logged in user is the creator of the blog entry */}
        {createdByCurrentUser && deleteButton()}

        <h3>comments</h3>
        <form onSubmit={submitComment}>
          <TextField name="comment"></TextField>
          <Button variant="outlined" color="primary" size="small" type="submit">add comment</Button>
        </form>

        <ul>
          {comments && comments.map((comment, i) => <li key={i}>{comment}</li>)}
        </ul>
      </div>
    )
  }

  return !blog ? 'Blog not found' : BlogDiv()
}

export default SingleBlogView