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

beforeEach(async () => { // Initialize the database before tests
  await Blog.deleteMany({})
  for (let n in initial_blogs) {
    let blogObject = new Blog(initial_blogs[n])
    await blogObject.save()
  }
})


describe('get requests', () => {
  test('are returned in json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })

  test('are returned fully', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, initial_blogs.length)
  })
  
  test('objects contain id and not _id', async () => {
    const response = await api.get('/api/blogs')
    const keys = Object.keys(response.body[0])
    assert(keys.includes('id'))
  })
})

describe('post requests', () => {
  test('work correctly', async () => {
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
  
  test('with missing likes property defaults to 0', async () => {
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
  
  test('with missing title or url causes bad request', async () => {
    const new_blog = {
      "author": "newcomer ",
      "url": "url.com",
    }
    const request = await api.post('/api/blogs')
    .send(new_blog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
  })
})

describe('delete requests', () => {
  test('work correctly', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body[0].id
    
    const request = await api.delete(`/api/blogs/${id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const deletion_response = await api.get('/api/blogs')
    assert.strictEqual(deletion_response.body.length, initial_blogs.length - 1)
  })
})
      

after(async () => {
  await mongoose.connection.close()
})