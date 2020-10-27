/* It's important that dotenv gets imported before the person model is imported. 
This ensures that the environment variables from the .env file are available globally 
before the code from the other modules is imported. */
require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


/* The execution order of middleware is the same as the order that they are loaded into
 express with the app.use function. */

// cors to allow the front end in port 3000 to acccess the server in a different port (3001).
// Essentially we circumvent the "same origin policy".
app.use(cors())


// integrate react front end
/* HTTP GET request it will first check if the build directory contains a file corresponding 
to the request's address. If a correct file is found, express will return it. */
app.use(express.static('build'))

// json parser for post requests.
// The json-parser middleware should be among the very first middleware loaded into Express.
app.use(express.json())


app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(req.body)
    ].join(' ')
}))



// let persons = [
//     {
//         name: "Arto Hellas",
//         number: "040-123456",
//         id: 1
//     },
//     {
//         name: "Ada Lovelace",
//         number: "39-44-5323523",
//         id: 2
//     },
//     {
//         name: "Dan Abramov",
//         number: "12-43-234345",
//         id: 3
//     },
//     {
//         name: "Mary Poppendieck",
//         number: "39-23-6423122",
//         id: 4
//     }
// ]




app.get('/info', (request, response) => {
    // use the .find method of the Mongoose model, which takes as a parameter and object with the search conditions.
    // Since the parameter is an empty object{}, we get all of the persons stored in the persons collection.
    // The search conditions use Mongo's syntax: https://docs.mongodb.com/manual/reference/operator/
    Person.find({}).then(persons => {
        let numberOfContacts = persons.length
        let currentDate = new Date();
        response.send(`<p>Phonebook has info for ${numberOfContacts} people <br><br>${currentDate}</p>`)
    })
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// We pass the next funciton as the third parameter of the handler
app.get('/api/persons/:id', (request, response, next) => {

    // Changed to Mongoose's findById method:
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        // .catch(error => {
        //     console.log(error)
        //     response.status(400).send({ error: 'malformatted id' })
        // })

        /* If next was called without a parameter, then the execution would simply move onto the 
        next route or middleware. If the next function is called with a parameter, then the 
        execution will continue to the error handler middleware. */
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response, next) => {

    const body = request.body
    console.log(body);

    if (!body.name || !body.number) {
        /* calling return is crucial, because otherwise the code will execute to the 
        very end and the malformed person gets saved to the application. */
        return response.status(400).json({
            error: 'contact details missing'
        })
    }
    // else if (persons.find(person => person.name === body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }





    // https://mongoosejs.com/docs/api.html#model_Model.exists
    // ** Duplicates are handled by both the front end and mongo?
    // else {
    //     Person.exists({ name: body.name })
    //         .then(exists => {
    //             console.log('Contact already in database: ', exists)
    //             if (exists) {
    //                 return response.status(409).json({
    //                     error: 'name must be unique'
    //                 })
    //             }
    //         })
    //         .catch(error => next(error))
    // }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        /* The response is sent inside of the callback function (.then) for the save operation. 
        This ensures that the response is sent only if the operation succeeded.  */
        // The data sent back in the response is the formatted version created with the toJSON method:
        response.json(savedPerson)
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    // note that this is a regular JS object, not a new person created by a constructor like in the post handler.
    const person = {
        name: body.name,
        number: body.number,
    }

    // by default, the .findByIdAndUpdate method returns the original object, by adeding the optional
    // third parameter so that the updated object is returned: https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})



/* It's also important that the middleware for handling unsupported routes is next to the 
last middleware that is loaded into Express, just before the error handler. */
// If we put it ahead the route handlers, they won't load and we will get an unknownEndpoint when loading the page.


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
    console.error('error message: ', error.message)
    // console.log('error name: ', error.name);
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

