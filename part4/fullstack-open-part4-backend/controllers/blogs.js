const Blog = require('./../models/blog')
const blogsRouter = require('express').Router()


blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => {
      next(error)
    })
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body
  const new_blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  }
  const blog = new Blog(new_blog)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => {
      next(error)
    })
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id
    request = await Blog.findByIdAndDelete(id)
    response.status(200).json(request)
  }
  catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter