const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')

router.post('/', async (request, response) => {
  const comment = new Comment(request.body)

  if (!comment.text) {
    return response.status(400).send({ error: 'empty comment'}).end()
  }

  const result = await comment.save()

  const blog = await Blog.findById(comment.blog)

  blog.comments = blog.comments.concat(comment)
  await blog.save()

  response.status(201).json(result)
})

module.exports = router