import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'

import CommentSection from './CommentSection'

// singular blog expanded
const ExpandedBlog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log('blog in expanded', blog)

  // Handle likes, called when like button is pressed
  const likeHandler = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  // handle blog deletions, called when delete button is pressed
  const deleteHandler = async (event) => {
    event.preventDefault()
    if (window.confirm(`do you want to delete ${blog.title}`)) {
      navigate('/')
      dispatch(deleteBlog(blog))
        .then((response) => {
          dispatch(showNotification(`deleted blog ${response.title}`))
        })
        .catch((e) => {
          dispatch(showNotification('error deleting blog'))
        })
    }
  }

  const username = user ? user.username : ''
  if (!blog) {
    return null
  }
  return (
    <div>
      <div class="card">
        <p>
          <strong>
            {blog.title} by {blog.author}
          </strong>
        </p>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <div class="blog-likes">
          <p className="likesCount">{blog.likes}</p>
          <button onClick={likeHandler}>👍</button>
        </div>
        <p>submitted by {blog.user.name}</p>
        {blog.user.username === username ? (
          <button onClick={deleteHandler}>delete</button>
        ) : null}
      </div>
      <CommentSection blog={blog} />
    </div>
  )
}

export default ExpandedBlog
