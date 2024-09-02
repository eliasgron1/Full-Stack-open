const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const User = require('../models/user')
const { usersInDb } = require('../utils/list_helper')

const api = supertest(app)

const initial_users = [
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

beforeEach(async () => { // Initialize the database before tests
  await User.deleteMany({})
  for (let n in initialUsers) {
    const request = await api
      .post('/api/users')
      .send(initialUsers[n])
    console.log("saved user", request.body)
  }

})


describe('creating a new user', () => {
  test('works correctly', async () => {
    const newUser = {
      name: 'Elias Grönholm',
      username: 'eliasgron',
      password: 'passwd123'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const savedUsers = await usersInDb()

    assert.strictEqual(savedUsers.length, initial_users.length + 1)
  })
})

describe('username and password validation', () => {
  test('works when username length < 4', async () => {
    const newUser = {
      name: 'Elias Grönholm',
      username: 'eli',
      password: 'passwd123'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const savedUsers = await usersInDb()

    assert.strictEqual(savedUsers.length, initial_users.length)
  })
  test('works when password length < 4', async () => {
    const newUser = {
      name: 'Elias Grönholm',
      username: 'eliasgron',
      password: '123'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const savedUsers = await usersInDb()

    assert.strictEqual(savedUsers.length, initial_users.length)
  })
  test('works when username not unique', async () => {
    const newUser = {
      name: 'Elias Grönholm',
      username: 'root',
      password: '123'
    }
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const savedUsers = await usersInDb()

    assert.strictEqual(savedUsers.length, initial_users.length)
  })
})

describe('get requests to /api/users', () => {
  test('work correctly', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, initial_users.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})