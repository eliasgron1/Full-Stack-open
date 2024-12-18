import Blog from './Blog'

// Lists of all the blogs
const BlogList = ({ blogs }) => {
  return (
    <div className="blogList">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
