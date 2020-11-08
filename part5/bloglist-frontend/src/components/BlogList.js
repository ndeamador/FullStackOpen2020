import React from 'react'
import Blog from './Blog'

const BlogList = ({ user, handleLogout, blogs}) => {
    return (
      <>
        <h2>blogs</h2>
        <div id="logged-in-line">{user.name} logged-in<button type="submit" onClick={handleLogout}>logout</button></div>

        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </>
    )
  }


export default BlogList