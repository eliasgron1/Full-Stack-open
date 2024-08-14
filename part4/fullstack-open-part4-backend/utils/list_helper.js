const User = require('../models/user')

// Takes input of blog object array
// Outputs 1
const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

// Takes input of blog object array
// Outputs the count of all likes
const totalLikes = (blogs) => {
  return blogs.reduce((sum, { likes }) => sum + likes, 0)
}


// Takes input of blog object array
// Outputs the blog object with the most likes
const favouriteBlog = (blogs) => {
  const most_likes = blogs.reduce((current_max, blog) => {
    return ((current_max.likes < blog.likes) ? blog : current_max)
  }, blogs[0])
  const blog_to_return = {
    author: most_likes.author,
    title: most_likes.title,
    likes: most_likes.likes
  }
  return blog_to_return
}


// Takes input of blog object array
// Outputs object containing the author that has made the most blogs, and the blog amount
const authorWithMostBlogs = (blogs) => {
  const author_blog_count = {}

  blogs.forEach(blog => {
    console.log('current counter: ', author_blog_count, 'next author to be counted: ', blog.author)
    if (author_blog_count[blog.author] !== undefined) {
      author_blog_count[blog.author]++
    }
    else {
      author_blog_count[blog.author] = 1
    }
  })
  console.log('final blog count for authors: ', author_blog_count)

  let max_blogs = 0
  let max_blogs_author = null

  for (let author in author_blog_count) {
    if (author_blog_count[author] > max_blogs) {
      max_blogs = author_blog_count[author]
      max_blogs_author = author
    }
  }
  console.log('returned blogs amount of author: ', max_blogs)
  console.log('returned author with most blogs: ', max_blogs_author)
  return {
    amount: max_blogs,
    author: max_blogs_author
  }
}


// Takes input of blog object array
// Outputs object containing the author that has the most likes and the like amount
const mostLikes = (blogs) => {
  const author_like_count = {}

  blogs.forEach(blog => {
    console.log('current like array: ', author_like_count, 'next likes to be counted: ', blog)
    if (author_like_count[blog.author] !== undefined) {
      author_like_count[blog.author] += blog.likes
    }
    else {
      author_like_count[blog.author] = blog.likes
    }
  })
  console.log('final like counts for authors: ', author_like_count)

  let max_likes = 0
  let max_likes_author = null

  for (let author in author_like_count) {
    if (author_like_count[author] > max_likes) {
      max_likes = author_like_count[author]
      max_likes_author = author
    }
  }
  console.log('most likes author: ', max_likes_author)
  console.log('like amount: ', max_likes)
  return {
    likes: max_likes,
    author: max_likes_author
  }
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

// Export the functions we need to use
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  authorWithMostBlogs,
  mostLikes,
  usersInDb
}