const assert = require('node:assert')
const { test,describe } = require('node:test')
const listHelper = require('./../utils/list_helper')

test ('dummy returns one', () => {
  const blogs = []

  const dummyResult = listHelper.dummy(blogs)
  assert.strictEqual(dummyResult, 1)

})

describe('total likes ', () => {
  const one_blog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  const multiple_blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'kalle',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d1710',
      title: 'Go To Statement Considered Harmful',
      author: 'jorma',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 4,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d1710',
      title: 'Go To Statement Considered Actually Not Harmful',
      author: 'jorma',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]


  test('likes of one blog only', () => {
    const likes_of_blog = listHelper.totalLikes(one_blog)
    assert.strictEqual(likes_of_blog, 5)
  })

  test('likes of multiple blogs', () => {
    const likes_of_blogs = listHelper.totalLikes(multiple_blogs)
    assert.strictEqual(likes_of_blogs, 20)
  })
  test('most liked blog', () => {
    const blog_with_most_likes = listHelper.favouriteBlog(multiple_blogs)
    assert.strictEqual(blog_with_most_likes.likes, 6)
  })
  test('get author with the most blogs', () => {
    const authorWithMostBlogs = listHelper.authorWithMostBlogs(multiple_blogs)
    assert.strictEqual(authorWithMostBlogs.author, 'jorma')
  })

})