import React from 'react'
import Blog from './Blog'


const BlogList = ({ blogs, updateBlog, deleteBlog, user }) => {

  const orderedBlogs = blogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1
    } else if (a.likes < b.likes) {
      return 1
    } else {
      return 0
    }
  })
  
  return (
    <div className="bloglist-container">
      {
        // Remember that in react, each item of a list must be provided a unique key.
        orderedBlogs.map((blog, i) =>
          // Remember that class is a keyword in JS and JSX, so className has to be used instead of class when working with React.
          <div className="blog-container" key={i}>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user} />
          </div>
        )
      }
    </div>
  )
}


export default BlogList