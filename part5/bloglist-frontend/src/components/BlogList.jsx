import Blog from './Blog'

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

export default BlogList