import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  // fetch initial blogs in database
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
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

  // handle messages displayed on page
  const showNotification = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  // Send post request to backend
  const createBlog = async (blog) => {
    try {
      const response = await blogService.postBlog(blog)
      showNotification(`added ${response.title} by ${response.author}`)
      setBlogs((prevBlogs) => prevBlogs.concat(response))

      blogFormRef.current.changeVisibility()
      console.log('blog submitted ', response)
    }
    catch (exception) {
      showNotification('error creating new blog')
      console.log('error creating blog: ', exception)
    }
  }

  return (
    <div>
      <Login
        user={user}
        setUser={setUser}
        showNotification={showNotification}
      />

      {!user ?
        <p>login to create a new blog entry</p> :
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            createBlog={createBlog}
          />
        </Togglable>
      }

      <Notification
        message={message}
      />

      <BlogList
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        showNotification={showNotification}
      />
    </div >
  )
}


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    < div className='notification' >
      {message}
    </div >
  )
}

export default App
