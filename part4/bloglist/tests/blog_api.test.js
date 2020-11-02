const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
// Since this test is done with the actual Mongo testing DB, we import the required parts to prepare and
// reset the database before and after each test.
const Blog = require('../models/blog')
const helper = require('./test_helper')

// const initialBlogs = [
//   {
//     title: 'Creating Adam',
//     author: 'test',
//     url: 'test.t',
//     likes: 1
//   },
//   {
//     title: 'Creating Eve',
//     author: 'test',
//     url: 'test.t',
//     likes: 2
//   }
// ]

// JestbeforeEAch method runs a function before each test in the file.
// In this case, we wipe the databse and then insert the two blogs above.
// To wipe the data base, we use the deleteMany method which deletes all blogs matching the conditions ({} = no conditions)
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})


// wrap the imported express app in the supertest function, into a superagent object
// superagent is a client-side HTTP request library: https://github.com/visionmedia/superagent
// the created object (api) can be used by tests for making HTTP request to the backend.
const api = supertest(app)

describe('API testing', () => {

  // This test verifies that the get request gets a 200 status and that the content type header is in application/json
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('two blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(200)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })


  test('Check that primary key is formatted as id and not _id', async () => {
    const blogs = await api.get('/api/blogs')

    expect(200)
    // check that the id property (transformed from _id in blogs.js) is defined with Jest's toBeDefined() method
    // https://jestjs.io/docs/en/expect#tobedefined
    // * note the method starts after the expect() parentheses
    expect(blogs.body[0].id).toBeDefined()
  })


  test('HTTP POST to /api/blogs successfully creates new blog', async () => {

    await api
      .post('/api/blogs')
      .send(helper.genericNewBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const blogTitleList = response.body.map(r => r.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogTitleList).toContain(
      'newcomer'
    )
  })


  test('likes property defaults to 0 if missing', async () => {

    await api
      .post('/api/blogs')
      .send(helper.noLikesBlog)
      .expect(200)

    const response = await api.get('/api/blogs')
    
    expect(response.body[helper.initialBlogs.length].likes).toBe(0)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })


  test('Server responds with status 400 both title AND url are missing from request', async () => {

    // Blog with title but no url should be successful
    await api
      .post('/api/blogs')
      .send(helper.noTitleBlog)
      .expect(200)

    // Blog with url but no title should be successful
    await api
      .post('/api/blogs')
      .send(helper.noUrlBlog)
      .expect(200)

    // Blog without title AND url should return 400
    await api
      .post('/api/blogs')
      .send(helper.onlyAuthorBlog)
      .expect(400)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length + 2)
  })
})



// close the database connection after all the tests are finished with jest's afterall() method:
// https://jestjs.io/docs/en/api.html#afterallfn-timeout
afterAll(() => {
  mongoose.connection.close()
})