// Bcrypt for hashing passwords
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    // Mongoose's populate method will include full blogs (and not just blog ids) when retreiving each user.
    // the arguments are the fields we want to include in each referenced blog: 
    // https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/#return-the-specified-fields-and-the-id-field-only
    const users = await User
        .find({}).populate('blogs', { title: 1, author: 1, url: 1})
    response.json(users)
})


usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter