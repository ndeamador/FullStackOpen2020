const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

// wrap the imported express app in the supertest function, into a superagent object
// superagent is a client-side HTTP request library: https://github.com/visionmedia/superagent
// the created object (api) can be used by tests for making HTTP request to the backend.
const api = supertest(app)

// Since this test is done with the actual Mongo testing DB, we import the required parts to prepare and
const Blog = require('../models/blog')


// JestbeforeEAch method runs a function before each test in the file.
// In this case, we wipe the databse and then insert the two blogs above.
// To wipe the data base, we use the deleteMany method which deletes all blogs matching the conditions ({} = no conditions)
beforeEach(async () => {
  await Blog.deleteMany({})

  // We use the methods below to avoid using nested async functions (outer async would not wait for the inner awaits)
  // With the for..of method, promises are resolved in order. With the Promise.all() method, in parallel.
  // we have to pass each blog through Mongoose's constructor. We don't do it in the tests below because
  // the constructor is already included in the route handlers.

  // Version executed in order with for..of
  // I went for this version despite the blogs not being ordered to prevent issues when accessing specific blogs in tests.
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  // Version executed in parallel with Promise.all()
  // const blogObjects = helper.initialBlogs
  //   .map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)
})


describe('Test blogs initialization', () => {

  // This test verifies that the get request gets a 200 status and that the content type header is in application/json
  test('blogs are returned as json', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('Correct number of initial blogs is returned clearing the test database.', async () => {

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
})



describe('viewing a specific blog', () => {

  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedblogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedblogToView)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with status code 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})



describe('Posting new blogs', () => {

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


  test('Server responds with status if 400 both title AND url are missing from request', async () => {

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



describe('Updating blogs', () => {

  test('succeeds with a valid id', async () => {
    const retrievedBlogs = await api.get(`/api/blogs`)
    const initialBlogToUpdate = { ...retrievedBlogs.body[0] }

    const updatedBlog = {
      likes: initialBlogToUpdate.likes + 1,
      title: initialBlogToUpdate.title
    }

    await api
      .put(`/api/blogs/${initialBlogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const result = await api.get(`/api/blogs/${initialBlogToUpdate.id}`)
    expect(result.body.likes).toBe(retrievedBlogs.body[0].likes + 1)
  })


  test('fails with status code 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    const blogToUpdate = 0
    // copied using spread operator to prevent overwritting the referenced original object
    let updatedBlog = { ...helper.initialBlogs[blogToUpdate] }
    updatedBlog.likes += 1

    await api
      .put(`/api/blogs/${invalidId}`)
      .send(updatedBlog)
      .expect(400)

    const response = await api.get(`/api/blogs/`)
    expect(200)
    expect(response.body[blogToUpdate].likes).toBe(helper.initialBlogs[blogToUpdate].likes)
  })

  test('Fails with status 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    const blogToUpdate = 0
    let updatedBlog = { ...helper.initialBlogs[blogToUpdate] }
    updatedBlog.likes += 1

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(updatedBlog)
      .expect(404)

    const response = await api.get(`/api/blogs/`)
   
    expect(200)
    expect(response.body[blogToUpdate].likes).toBe(helper.initialBlogs[blogToUpdate].likes)
  })

})



describe('Deleting blogs', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const title = blogsAtEnd.map(r => r.title)

    expect(title).not.toContain(blogToDelete.title)
  })
})



// close the database connection after all the tests are finished with jest's afterall() method:
// https://jestjs.io/docs/en/api.html#afterallfn-timeout
afterAll(() => {
  mongoose.connection.close()
})