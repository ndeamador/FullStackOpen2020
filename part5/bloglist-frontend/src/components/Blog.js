import React from 'react'
import Toggleable from './Toggleable'


const Blog = ({ blog, updateBlog }) => {

  const blogTitleAndAuthor = () => (
    <div className="blog-title-and-author" initial-state="show"> {blog.title}, by {blog.author}</div>
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

  return (
    <Toggleable buttonLabel1='view' buttonLabel2='hide'>
      <div className="blog-title-and-author" initial_state="show"> {blog.title}, by {blog.author}</div>
      {extendedBlog()}
    </Toggleable>
  )


}
export default Blog
