// using  the .Router() middleware/object instead of the usual app (express()) is done to extract routes to a separate module.
// while express() handles everything (html, css, database comms), .Router only handles middleware and routing.
// it seems to be used mainly to separate routes into a dedicated module (for 'related' routes).
// http://expressjs.com/en/api.html#router
const blogsRouter = require('express').Router()

// establishing connection to the database has been done in app.js, so the blog model only defines the schema for blogs
const Blog = require('../models/blog')



// These are relative paths, since in app js the router has been linked to the address api/blogs  (so route /:id goes to api/blogs/:id)
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
})

module.exports = blogsRouter