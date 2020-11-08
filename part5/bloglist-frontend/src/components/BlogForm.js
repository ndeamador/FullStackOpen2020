
import React from 'react'

const BlogForm = ({ title, author, url, handleTitleChange, handleAuthorChange, handleUrlChange, handleSubmit }) => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="create">create</button>
      </form>
    </>
  )

  export default BlogForm