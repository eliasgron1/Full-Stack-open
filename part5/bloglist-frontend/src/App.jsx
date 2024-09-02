import { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  // fetch initial blogs in database
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [])

  // check for a saved user in local storage 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  // Handle messages displayed on page
  const showNotification = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  return (
    <div>
      <Login
        user={user}
        setUser={setUser}
        showNotification={showNotification}
      />

      {user === null ?
        <p>login to create a new blog entry</p> :
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            blogFormRef={blogFormRef}
            setBlogs={setBlogs}
            showNotification={showNotification}
          />
        </Togglable>
      }

      <Notification
        message={message}
      />

      <Blogs
        showNotification={showNotification}
        user={user}
        setBlogs={setBlogs}
        blogs={blogs}
      />
    </div >
  )
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

export default App
