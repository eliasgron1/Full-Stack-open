const User = ({ user }) => {
  //console.log('user.blogs', user.blogs)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>blogs</h3>
      <table>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                {blog.title} by {blog.author}
              </td>
              <td>{blog.likes} likes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default User
