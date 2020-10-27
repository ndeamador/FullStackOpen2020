const mongoose = require('mongoose')

// if this file is executed with a command of less than two words, request the password
// it's meant to be executed as node mongo.js  password
if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>');
    process.exit(1)
}

const password = process.argv[2]

const databaseName = 'phonebook-app'

const url =
    `mongodb+srv://test:${password}@cluster0-aebq8.mongodb.net/${databaseName}?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// Schema telling Mongoose how the objects are to be stored in the database
// As Mongo is schemaless, it's possible to store documents with other structures.
// This way, Mongoose gives a standard constructor at application level.
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

// Model definition: the first parameter (Person) is the singular name of the model
// the name of the collection, in Mongoose convention, is plural and lower case (so Person -> persons)
// Mongoose will automatically asign the collection name (Person -> persons)
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {

    // Prints all notes stored in database: 
    Person.find({}).then(result => {
        console.log('\nphonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length > 3) {

    const contact = process.argv[3]
    const number = process.argv[4]

    const person = new Person({
        name: contact,
        number: number
    })

    // Save object to the database with the .save method 
    // it's important to close the connection or the program will never finish execution.

    person.save().then(response => {
        console.log(`added ${response.name} number ${response.number} to phonebook`)
        mongoose.connection.close()
    })

}
