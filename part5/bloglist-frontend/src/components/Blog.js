import React from 'react'
import Toggleable from './Toggleable'


const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const blogTitleAndAuthor = () => (
    <div className="blog-title-and-author" initial-state="show"> {blog.title}, by {blog.author}</div>
  )

  const extendedBlog = () => (
    <div className="blog-content" initial_state="hide">
      {blogTitleAndAuthor()}
      <div className="extended-blog">
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={addLike}>like</button></div>
        <div>Entry created by: {blog.user.name}</div>
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

  // Added the or to prevent inconsistencies with "populate" in the backend.
  const createdByCurrentUser = user.id === (blog.user.id || blog.user)



  const deleteButton = () => (
    <button className="blog-delete-button" initial_state="hide" onClick={confirmDeletion}>Delete blog</button>
  )



  return (
    <Toggleable buttonLabel1='view' buttonLabel2='hide'>
      <div className="blog-title-and-author" initial_state="show"> {blog.title}, by {blog.author}</div>
      {extendedBlog()}
      {/* The delete button is only shown if the current logged in user is the creator of the blog entry */}
      {createdByCurrentUser && deleteButton()}
    </Toggleable>
  )


}
export default Blog
