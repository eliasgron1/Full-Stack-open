import Togglable from './Togglable'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useRef } from 'react'
import { showNotification } from '../reducers/notificationReducer'

// Form for creating new blogs, not rendered unless user logged in
const BlogForm = ({ user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const blogSubmitHandler = async (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url,
    }
    dispatch(createBlog(blog))
      .then((response) => {
        blogFormRef.current.changeVisibility()
        dispatch(showNotification(`successfully added blog: ${response.title}`))
      })
      .catch((e) => {
        dispatch(showNotification('error creating blog'))
        console.error('failed to create blog', e)
      })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div class="blogForm" >
      {!user ? (
        <p>login to create a new blog entry</p>
      ) : (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <form onSubmit={blogSubmitHandler}>
            <h2>add new blog</h2>
            <div>
              <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
                placeholder="title"
              />
            </div>
            <div>
              <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
                placeholder="author"
              />
            </div>
            <div>
              <input
                type="text"
                value={url}
                name="Url"
                onChange={({ target }) => setUrl(target.value)}
                placeholder="url"
              />
            </div>
            <button type="submit">submit</button>
          </form>
        </Togglable>
      )}
    </div>
  )
}

export default BlogForm
