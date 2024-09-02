const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')


const api = supertest(app)


const initialBlogs = [
  {
    "title": "man does a tester 1",
    "author": "testman ",
    "url": "blaablaa.com",
    "likes": 5,
  },
  {
    "title": "man does a tester 2",
    "author": "testman ",
    "url": "blaablaa.com",
    "likes": 6,
  },
  {
    "title": "man does a tester 3",
    "author": "testman ",
    "url": "blaablaa.com",
    "likes": 3,
  }
]

const initialUsers = [
  {
    name: 'root',
    username: 'root',
    password: 'secret'
  }
]

const creds = {
  name: 'root',
  username: 'root',
  password: 'secret'
}


const getToken = async () => {
  const response = await api
    .post('/api/login')
    .send(creds)
  return response.body.token
}


// Initialize the database before tests
beforeEach(async () => {
  await User.deleteMany({})
  for (let n in initialUsers) {
    const request = await api.post('/api/users')
      .send(initialUsers[n])
  }
  const token = await getToken()
  await Blog.deleteMany({})
  for (let n in initialBlogs) {
    let blogObject = new Blog(initialBlogs[n])
    const request = await api.post('/api/blogs')
      .send(initialBlogs[n])
      .set('Authorization', `Bearer ${token}`)

  }
})


// TESTS FOR GET REQUESTS 
describe('get requests', () => {
  test('are returned in json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are returned fully', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('objects contain id and not _id', async () => {
    const response = await api.get('/api/blogs')
    const keys = Object.keys(response.body[0])
    assert(keys.includes('id'))
  })

  test('with id parameter work correctly', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    const result = await api.get(`/api/blogs/${id}`)
    assert.strictEqual(result.body.title, initialBlogs[0].title)
  })
})

// TESTS FOR POST REQUESTS
describe('post requests', () => {
  test('work correctly', async () => {
    const token = await getToken()
    const new_blog = {
      "title": "man creates a new blog",
      "author": "newcomer ",
      "url": "url.com",
    }
    const request = await api.post('/api/blogs')
      .send(new_blog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(res => res.title)

    assert.strictEqual(response.body.length, initialBlogs.length + 1)
    assert(titles.includes('man creates a new blog'))
  })

  test('with missing likes property defaults to 0', async () => {
    const token = await getToken()
    const new_blog = {
      "title": "man creates a new blog",
      "author": "newcomer ",
      "url": "url.com",
    }
    const request = await api.post('/api/blogs')
      .send(new_blog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(request.body.likes, 0)
  })

  test('with missing title or url causes bad request', async () => {
    const token = await getToken()
    const new_blog = {
      "author": "newcomer ",
      "url": "url.com",
    }
    const request = await api.post('/api/blogs')
      .send(new_blog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('with missing token causes error code 401', async () => {
    const new_blog = {
      "title": "401",
      "author": "newcomer ",
      "url": "url.com",
    }
    const request = await api.post('/api/blogs')
      .send(new_blog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })
})

// TESTS FOR DELETE REQUESTS
describe('delete requests', () => {
  test('work correctly', async () => {
    const token = await getToken()
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    const request = await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const deletion_response = await api.get('/api/blogs')
    assert.strictEqual(deletion_response.body.length, initialBlogs.length - 1)
  })
})

// TESTS FOR PUT REQUESTS
describe('put requests', () => {
  test('can add likes', async () => {
    const token = await getToken()
    const response = await api.get('/api/blogs')
    const new_blog = {
      "title": response.body[0].title,
      "author": response.body[0].author,
      "url": response.body[0].url,
      "likes": response.body[0].likes + 1,
    }
    const id = response.body[0].id
    await api.put(`/api/blogs/${id}`)
      .send(new_blog)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const changed_response = await api.get('/api/blogs')
    assert.strictEqual(response.body[0].likes + 1, changed_response.body[0].likes)
  })
})


after(async () => {
  await mongoose.connection.close()
})