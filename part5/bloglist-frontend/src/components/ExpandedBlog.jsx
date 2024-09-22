
// singular blog expanded
const ExpandedBlog = ({ blog, user, likeHandler, deleteHandler }) => {
  return (
    <div>
      <p>{blog.url}</p>
      <p className="likesCount">{blog.likes}</p>
      <button onClick={likeHandler}>like</button>
      <p>{blog.user.name}</p>
      {
        blog.user.username === user.username ?
          < button onClick={deleteHandler}>delete</button> :
          null
      }
    </div >
  )
}

export default ExpandedBlog