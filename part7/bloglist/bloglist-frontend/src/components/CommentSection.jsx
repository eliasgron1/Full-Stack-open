import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { postNewComment } from '../reducers/commentsReducer'
import { initComments } from '../reducers/commentsReducer'

const CommentSection = ({ blog }) => {
  const [newComment, setNewComment] = useState('')
  const comments = useSelector((state) => state.comments)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initComments(blog))
  }, [dispatch])

  const commentSubmitHandler = async (event) => {
    event.preventDefault()
    dispatch(postNewComment(blog.id, newComment))
      .then((response) => {
        console.log('comment created')
      })
      .catch((e) => {
        console.error('error submitting comment', e)
      })
    setNewComment('')
  }

  return (
    <div class="card">
      <h2>comments</h2>
      {comments.length === 0 ? (
        <p>no comments yet...</p>
      ) : (
        <div>
          {comments.map((comment, index) => (
            <p key={index}>{`> ${comment}`}</p>
          ))}
        </div>
      )}
      <div>
        <form onSubmit={commentSubmitHandler}>
          <input
            type="text"
            value={newComment}
            name="comment"
            onChange={({ target }) => setNewComment(target.value)}
            placeholder="new comment"
          />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  )
}

export default CommentSection
