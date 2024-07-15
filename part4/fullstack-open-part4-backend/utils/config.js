require('dotenv').config({ path: './variables.env' })

const process = require('process')

const PORT = process.env.PORT
const NODE_ENV = process.env.NODE_ENV
const MONGODB_URI = NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI,
  NODE_ENV
}