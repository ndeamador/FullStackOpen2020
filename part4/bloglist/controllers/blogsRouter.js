// using  the .Router() middleware/object instead of the usual app (express()) is done to extract routes to a separate module.
// while express() handles everything (html, css, database comms), .Router only handles middleware and routing.
// it seems to be used mainly to separate routes into a dedicated module (for 'related' routes).
// http://expressjs.com/en/api.html#router
const blogsRouter = require('express').Router()

// establishing connection to the database has been done in app.js, so the blog model only defines the schema for blogs
const Blog = require('../models/blog')


// These are relative paths, since in app js the router has been linked to the address api/blogs  (so route /:id goes to api/blogs/:id)
blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title && !blog.url) {
        return response.status(400).json({ error: 'Blog requires title or url' })
    }

    const result = await blog.save()

    response.status(200).json(result)
})

blogsRouter.get('/:id', async (request, response) => {

    // There seems to be a problem with Mongo returning error 500 if an invalid id is provided and stopping the execution.
    // It seems to be a common problem with Mongo, so I will handle the invalid id beforehand
    // https://github.com/strapi/strapi/issues/5930
    // https://stackoverflow.com/questions/14940660/whats-mongoose-error-cast-to-objectid-failed-for-value-xxx-at-path-id

    // If ID is not valid in Mongo:
    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return response.status(400).end()
    }

    // If Id is valid:
    const blog = await Blog.findById(request.params.id)

    if (blog) {
        response.json(blog)
    } else {
        // the .end() method ends responses that send back no content.
        response.status(404).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {

    // If ID is not valid in Mongo:
    if (!request.params.id.match(/^[0-9a-fA-F]{24}$/)) {

        return response.status(400).json({ error: 'Invalid ID' })
    }

    // If ID is valid
    const blog = request.body

    if (!blog.title && !blog.url) {

        return response.status(400).json({ error: 'Blog requires title or url' })
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    if (updatedBlog) {
        response.json(updatedBlog)
    } else {
        response.status(404).json({ error: 'Blog not found in database' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter