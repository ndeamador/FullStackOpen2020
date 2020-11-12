import React from 'react'
import Toggleable from './Toggleable'


const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const blogTitleAndAuthor = () => (
    <div className="blog-title-and-author" initial_state="show"> {blog.title}, by {blog.author}</div>
  )


  const extendedBlog = () => (
    <div className="blog-content" initial_state="hide">
      {blogTitleAndAuthor()}
      <div className="extended-blog">
        <div className="url-line">{blog.url}</div>
        <div className="likes-line">likes: {blog.likes} <button onClick={addLike}>like</button></div>
        <div className="creator-line">Entry created by: {blog.user.name}</div>
      </div>
    </div>
  )

  const addLike = async () => {
    const updatedBlog = {
      author: blog.author,
      likes: blog.likes + 1,
      title: blog.title,
      user: blog.user.id
    }

    await updateBlog(blog.id, updatedBlog)
  }

  const confirmDeletion = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {

      deleteBlog(blog.id)
    }
  }

  const createdByCurrentUser = (user.id === blog.user.id)

  const deleteButton = () => (
    <button className="blog-delete-button" initial_state="hide" onClick={confirmDeletion}>Delete blog</button>
  )

  return (
    <Toggleable buttonLabel1='view' buttonLabel2='hide'>
      {blogTitleAndAuthor()}
      {extendedBlog()}
      {/* The delete button is only shown if the current logged in user is the creator of the blog entry */}
      {createdByCurrentUser && deleteButton()}
    </Toggleable>
  )


}
export default Blog

