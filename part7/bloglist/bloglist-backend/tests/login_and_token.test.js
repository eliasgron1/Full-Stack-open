const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [{
  name: "Blog Writer",
  username: "write111",
  password: "bestpassword"
}]

const creds = {
  name: "Blog Writer",
  username: "write111",
  password: "bestpassword"

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


test('token is returned', async () => {
  const response = await api
    .post('/api/login/')
    .send(creds)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  console.log("response:", response.body)
  assert(response.body.token)
})

after(async () => {
  await mongoose.connection.close()
})