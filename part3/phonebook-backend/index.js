const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')


// cors to allow the front end in port 3000 to acccess the server in a different port (3001).
// Essentially we circumvent the "same origin policy".
app.use(cors())

// json parser for post requests.
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

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    let numberOfContacts = persons.length
    let currentDate = new Date();
    response.send(`<p>Phonebook has info for ${numberOfContacts} people <br><br>${currentDate}</p>`)
    response.send()

})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})


app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    // return 404 status if the route asks for a non-existent person id.
    if (person) {
        response.json(person)
    }
    else {
        /* Since no data is attached to the response, we use the status method for setting the status, 
        and the end method for responding to the request without sending any data. */
        response.status(400).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id != id)

    // respond with status code 204 (no content) and return no data with the response.
    response.status(204).end()
})

const generateId = () => {
    return (Math.floor(Math.random() * 100) + 1)
}

app.post('/api/persons', (request, response) => {

    const body = request.body
    console.log(body);

    if (!body.name || !body.number) {
        /* calling return is crucial, because otherwise the code will execute to the 
        very end and the malformed note gets saved to the application. */
        return response.status(400).json({
            error: 'contact details missing'            
        })
    }
    else if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'            
        })
    }
    // else if() {


    //     return response.status(400).json({
    //         error: 'name must be unique'            
    //     })
    // }


    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

        persons = persons.concat(person)

    response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

