const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)



describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })


  test('user creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })


  test('user creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })



  test('User creationg fails if password is missing or shorter than 3 characters', async () => {
    console.log('ENTERING TEST ===========================');
    
    await api
      .post('/api/users')
      .send(helper.userShortPassword)
      .expect(401)

    await api
      .post('/api/users')
      .send(helper.userNoPassword)
      .expect(401)

    await api
      .post('/api/users')
      .send(helper.userNullPassword)
      .expect(401)
  })

  test('User creationg fails if username is missing or shorter than 3 characters', async () => {

    const res1 = await api
      .post('/api/users')
      .send(helper.userShortUsername)
      .expect(400)

      console.log('01------------', res1.error);

      const res2 =  await api
      .post('/api/users')
      .send(helper.userNoUsername)
      .expect(400)

      console.log('02------------', res2.error);


      const res3 =  await api
      .post('/api/users')
      .send(helper.userNullUsername)
      .expect(400)
      console.log('03------------', res3.error);

  })

})



afterAll(() => {
  mongoose.connection.close()
})
