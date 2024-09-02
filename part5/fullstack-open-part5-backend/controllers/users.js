const User = require('../models/user')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
  const { name, password, username } = request.body

  if (!username || !password) {
    return response.status(400).json({ error: 'username and password required' })
  }
  if (username.length < 4 || password.length < 4) {
    return response.status(400).json({ error: 'username and password have to be longer than 3' })
  }
  const existingUser = await User.findOne({ username })
  if (existingUser === true) {
    return response.status(400).json({ error: 'username already exists' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const new_user = {
    name,
    username,
    passwordHash
  }
  const user = User(new_user)

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

  response.json(users)
})

module.exports = userRouter