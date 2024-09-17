import Togglable from './Togglable'
import ExpandedBlog from './ExpandedBlog'
import blogService from '../services/blogs'

// Singular blog
const Blog = ({ blog, setBlogs, user, showNotification }) => {

  // Handle likes, called when like button is pressed
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

  // handle blog deletions, called by delete button
  const deleteHandler = async (event) => {
    event.preventDefault()
    try {
      if (window.confirm(`do you want to delete ${blog.title}`)) {
        console.log('deleted', blog)
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
    <div className='blog'>
      <p>{blog.title} by {blog.author}</p>
      <Togglable buttonLabel='view'>
        <ExpandedBlog
          blog={blog}
          user={user}
          likeHandler={likeHandler}
          deleteHandler={deleteHandler}
        />
      </Togglable>
    </div>
  )
}

export default Blog