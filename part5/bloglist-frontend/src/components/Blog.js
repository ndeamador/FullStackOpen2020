import React from 'react'
import Toggleable from './Toggleable'


const Blog = ({ blog }) => {

  const blogTitleAndAuthor = () => (
    <div className="blog-title-and-author" initial-state="show"> {blog.title}, by {blog.author}</div>
  )

  const extendedBlog = () => (
    <div className="blog-content" initial_state="hide">
      {blogTitleAndAuthor()}
      <div className="extended-blog">
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button>like</button></div>
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
