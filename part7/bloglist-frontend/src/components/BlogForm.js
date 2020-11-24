
import React, { useState } from 'react'
import { clearBlogForm } from '../reducers/blogFormReducer'

const BlogForm = ({ createBlog }) => {

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')

  // const clearBlogFormFields = () => {
  //   setTitle('')
  //   setAuthor('')
  //   setUrl('')
  // }




  const addBlog = async (event) => {
    event.preventDefault()

    const newObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    createBlog(newObject)

    clearBlogForm()
  }


  return (
    <div className="blogform-container">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            id="blogform-title-input"
            type="text"
            name="title"
            // value={title}
            // onChange={({ target }) => setTitle(target.value)}
            // onChange={({ target }) => editBlogForm({title: target.value})}

          />
        </div>
        <div>
          author
          <input
            id="blogform-author-input"
            type="text"
            name="author"
            // value={author}
            // onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id="blogform-url-input"
            type="text"
            name="url"
            // value={url}
            // onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="blogform-create-button" type="create">create</button>
      </form>
    </div>
  )
}

export default BlogForm