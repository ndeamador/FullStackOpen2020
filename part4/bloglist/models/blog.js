const mongoose = require('mongoose')

// define the schema to teel Mongoose how blog objects will be stored in the database (values, validators, etc)
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
})

// Format the object returned by Moongose by modifying the toJson method of the schema.
// In this case, we want the _id property in Mongo to return as id
// Mongoose .set method: https://mongoosejs.com/docs/api.html#mongoose_Mongoose-set
// Mongoose .transform: https://mongoosejs.com/docs/api.html#schematype_SchemaType-transform
blogSchema.set('toJSON', {
  // document is the current value, returnedObject is the returned/converted value in the JSON output.
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    // we also delete the __v (version) property automatically generated by MongoDB
    delete returnedObject.__v
  }
})

// Mongoose model constructor.
// the model provides an interface to the database for CRUD operations.
// the first parameter is the singular name of the model, which will be automatically make "notes" (lowercase plural) the name of the collection.

// const Blog = mongoose.model('Blog', blogSchema)
// module.exports = Blog

// constructor and exporting are normally done in the same line:
module.exports = mongoose.model('Blog', blogSchema)