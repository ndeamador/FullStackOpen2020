
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const clearBlogFormFields = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const addBlog = async (event) => {
        event.preventDefault()

        const newObject = {
            title,
            author,
            url
        }

        createBlog(newObject)

        clearBlogFormFields()
    }


    return (
        <div className="blogform-container">
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title
          <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
          <input
                        type="text"
                        name="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
          <input
                        type="text"
                        name="url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="create">create</button>
            </form>
        </div>
    )
}

export default BlogForm