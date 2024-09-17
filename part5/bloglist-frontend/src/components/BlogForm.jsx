import { useState } from 'react'


// Form for creating new blogs, not rendered unless user logged in
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  // Call blogSubmitHandler
  const blogSubmitHandler = async (event) => {
    event.preventDefault()
    const blog = {
      'title': title,
      'author': author,
      'url': url
    }
    createBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={blogSubmitHandler}>
      <h2>add new blog</h2>
      <div>
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
          placeholder='title'
        />
      </div>
      <div>
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='author'
        />
      </div>
      <div>
        <input
          type='text'
          value={url}
          name='Url'
          onChange={({ target }) => setUrl(target.value)}
          placeholder='url'
        />
      </div>
      <button type='submit'>submit</button>
    </form>
  )
}

export default BlogForm