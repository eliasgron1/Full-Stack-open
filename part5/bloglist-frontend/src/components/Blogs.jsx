import Togglable from './Togglable'
import blogService from '../services/blogs'

// Lists of all the blogs
const BlogList = ({ blogs, setBlogs, user, showNotification }) => {
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          setBlogs={setBlogs}
          showNotification={showNotification}
        />
      ))}
    </div>
  )
}

// Singular blog
const Blog = ({ blog, setBlogs, user, showNotification }) => {
  return (
    <div className="blog">
      <p>{blog.title} by {blog.author}</p>
      <Togglable buttonLabel='view'>
        <ExpandedBlog
          setBlogs={setBlogs}
          blog={blog}
          user={user}
          showNotification={showNotification}
        />
      </Togglable>
    </div>
  )
}

// singular blog expanded
const ExpandedBlog = ({ blog, setBlogs, user, showNotification }) => {
  const likeHandler = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const response = await blogService.likeBlog(newBlog, blog.id)
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === response.id ? { ...response, user: blog.user } : blog
        )
      )
    }
    catch (exception) {
      console.log('error liking blog')
    }
  }

  const deleteHandler = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`do you want to delete ${blog.title}`)) {
        console.log('deleted', blog.id)
        const response = await blogService.deleteBlog(blog.id)
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== response.id))
        showNotification('blog deleted')
      }
    }
    catch (exception) {
      console.log('error deleting blog')
    }
  }

  return (
    <div>
      <p>{blog.url}</p>
      <p>{blog.likes}<button onClick={likeHandler}>like</button></p>
      <p>{blog.user.name}</p>
      {
        blog.user.username === user.username ?
          < button onClick={deleteHandler}>delete</button> :
          null
      }
    </div >
  )
}

export default BlogList