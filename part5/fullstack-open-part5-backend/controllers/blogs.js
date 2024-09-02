const Blog = require('../models/blog')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const process = require('process')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.get('/:id', async (request, response) => {
  const result = await Blog.findById(request.params.id)
  response.json(result)
})


blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user
  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  const newBlog = {
    title,
    author,
    url,
    user: user.id,
    likes: likes === undefined ? 0 : likes
  }

  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(blogId)

  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (blog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'user invalid' })
  }

  request = await Blog.findByIdAndDelete(blogId)
  response.status(200).json(request)
})


blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const body = request.body
  const updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  // check if only likes are being updated
  const updatingLikes = () => {
    if (
      currentBlog.title === updatedBlog.title &&
      currentBlog.author === updatedBlog.author &&
      currentBlog.url === updatedBlog.url &&
      currentBlog.likes + 1 === updatedBlog.likes
    ) {
      return true
    }
    return false
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const currentBlog = await Blog.findById(blogId)

  if (updatingLikes()) {
    const result = await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true, runValidators: true, context: 'query' })
    return response.status(200).json(result)
  }

  if (!currentBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (currentBlog.user.toString() !== decodedToken.id.toString()) {
    return response.status(401).json({ error: 'user invalid' })
  }

  // throw error if likes are trying to be updated when they are not supposed to
  if (currentBlog.likes !== updatedBlog.likes) {
    return response.status(400).json({ error: 'invalid likes' })
  }

  const result = await Blog.findByIdAndUpdate(blogId, updatedBlog, { new: true, runValidators: true, context: 'query' })
  response.status(200).json(result)
})


module.exports = blogsRouter