const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { request } = require('node:http')

const api = supertest(app)

const initial_blogs = [
  {
    "title": "man does a tester 2",
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

beforeEach(async () => { // Initialize the database before tests
  await Blog.deleteMany({})
  console.log('db reset')
  for (let n in initial_blogs) {
    let blogObject = new Blog(initial_blogs[n])
    await blogObject.save()
  }
})


describe('blog api tests', () => {
  test('blogs are returned in json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initial_blogs.length)
  })

  test('blog identifier number is named id', async () => {
    const response = await api.get('/api/blogs')
    const keys = Object.keys(response.body[0])
    assert(keys.includes('id'))
  })

  test('post requests work correctly', async () => {
    const new_blog = {
      "title": "man creates a new blog",
      "author": "newcomer ",
      "url": "url.com",
    }
    const request = await api.post('/api/blogs')
      .send(new_blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(res => res.title)

    assert.strictEqual(response.body.length, initial_blogs.length + 1)
    assert(titles.includes('man creates a new blog'))
  })

  test('missing likes property defaults to 0', async () => {
    const new_blog = {
      "title": "man creates a new blog",
      "author": "newcomer ",
      "url": "url.com",
    }
    const request = await api.post('/api/blogs')
      .send(new_blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(request.body.likes, 0)
  })

  test('missing title or url causes bad request', async () => {
    const new_blog = {
      "author": "newcomer ",
      "url": "url.com",
    }
    const request = await api.post('/api/blogs')
      .send(new_blog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    console.log(request.body)
  })


  after(async () => {
    await mongoose.connection.close()
  })
});