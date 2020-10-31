const mongoose = require('mongoose')

// define the schema to teel Mongoose how blog objects will be stored in the database (values, validators, etc)
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

// Mongoose model constructor.
// the model provides an interface to the database for CRUD operations.
// the first parameter is the singular name of the model, which will be automatically make "notes" (lowercase plural) the name of the collection.

// const Blog = mongoose.model('Blog', blogSchema)
// module.exports = Blog

// constructor and exporting are normally done in the same line:
module.exports = mongoose.model('Blog', blogSchema)