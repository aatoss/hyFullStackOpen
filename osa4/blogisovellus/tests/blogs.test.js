const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
let token = null

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('salasana', 10)
  const user = new User({ username: 'testi', name: 'Testi Käyttäjä', passwordHash })
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'testi', password: 'salasana' })

  token = loginResponse.body.token

  const blogObjects = helper.blogs.map(b => new Blog({ ...b, user: user._id }))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

describe('return blogs correctly from the database', () => {

  test('blogs are returned in json format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 6)
  })

  test('id is not returned as _id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert.ok(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

describe('adding new blogs to db', () => {

  test('successfully adds a new blog', async () => {
    const testBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    assert.ok(titles.includes('React patterns'))
  })

  test('fails to add blog with missing token', async () => {
    const testBlog = {
      title: 'No token',
      author: 'Not me',
      url: 'www.google.com',
    }

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(401)
  })

  test('blog has 0 likes by default', async () => {
    const testBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog)
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('fails to add blog with missing title', async () => {
    const testBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog)
      .expect(400)
  })

  test('fails to add blog with missing url', async () => {
    const testBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(testBlog)
      .expect(400)
  })
})

describe('deleting blogs from db', () => {

  test('successfully deletes a blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)
  })
})

describe('modifying blogs in db', () => {

  test('successfully updates likes', async () => {
    const blogs = await helper.blogsInDb()
    const blogToLike = blogs[0]

    const updatedBlogData = {
      ...blogToLike,
      likes: blogToLike.likes + 10
    }

    const response = await api
      .put(`/api/blogs/${blogToLike.id}`)
      .send(updatedBlogData)
      .expect(200)

    assert.strictEqual(response.body.likes, blogToLike.likes + 10)
  })
})

after(async () => {
  await mongoose.connection.close()
})