const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, { likes }) => sum + likes, 0 )
}

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

  // let most_liked_blog = blogs[0]
  // for(let i=0; i<blogs.length; i++) {
  //   if(blogs[i].likes > most_liked_blog.likes) {
  //     most_liked_blog = blogs[i].likes
  //   }
  // }
  // return most_liked_blog
}

const authorWithMostBlogs = (blogs) => {
  const author_blog_count = {}

  blogs.forEach(blog => {
    console.log('current counter: ', author_blog_count,'next author to be counted: ', blog.author)
    if(author_blog_count[blog.author] !== undefined){
      author_blog_count[blog.author]++
    }
    else{
      author_blog_count[blog.author] = 1
    }
  })
  console.log('final blog count for authors: ', author_blog_count)

  let max_blogs = 0
  let max_blogs_author = null

  for(let author in author_blog_count){
    if(author_blog_count[author] > max_blogs){
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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  authorWithMostBlogs
}