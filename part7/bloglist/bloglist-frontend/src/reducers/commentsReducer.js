import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
  },
})

export const { setComments } = commentsSlice.actions

export const initComments = (blog) => {
  return (dispatch) => {
    if (blog && blog.comments) {
      const comments = blog.comments
      dispatch(setComments(comments))
    }
  }
}

export const postNewComment = (id, comment) => {
  return async (dispatch) => {
    try {
      if (!comment || !id) {
        throw new Error('missing comment or id')
      }
      const response = await blogService.postComment(id, comment)
      dispatch(setComments(response.comments))
      return response
    } catch (e) {
      throw e
    }
  }
}

export default commentsSlice.reducer
