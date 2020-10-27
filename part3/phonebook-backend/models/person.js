const mongoose = require('mongoose')



const url = process.env.MONGODB_URI

console.log('connecting to', url)


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


// Schema telling Mongoose how the objects are to be stored in the database
// As Mongo is schemaless, it's possible to store documents with other structures.
// This way, Mongoose gives a standard constructor at application level.
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// We do some formatting to the personSchema:
// don't return the automatically added __v (version) property
// modify mongoose _id propert (an object) and turn it into a mere string.
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


// Model definition: the first parameter (Person) is the singular name of the model
// the name of the collection, in Mongoose convention, is plural and lower case (so Person -> persons)
// Mongoose will automatically asign the collection name (Person -> persons)
module.exports = mongoose.model('Person', personSchema)