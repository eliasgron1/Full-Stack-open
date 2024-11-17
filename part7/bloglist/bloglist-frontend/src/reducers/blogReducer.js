import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
import { sortByLikes } from '../util/blogsUtil.js'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      const blogExist = state.find((blog) => blog.id === action.payload.id)
      if (blogExist) {
        const blogs = state.map((blog) =>
          blog.id == action.payload.id ? action.payload : blog
        )
        return sortByLikes(blogs)
      } else {
        const newState = [...state, action.payload]
        return sortByLikes(newState)
      }
    },
    setBlogs(state, action) {
      return sortByLikes(action.payload)
    },
  },
})

export const { appendBlog, setBlogs } = blogsSlice.actions

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      if (!blog.url || !blog.title || !blog.author) {
        throw new Error('Missing url, title or author')
      }
      const response = await blogService.postBlog(blog)
      dispatch(appendBlog(response))
      return response
    } catch (e) {
      throw e
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      const response = await blogService.likeRequest(newBlog, blog.id)
      const state = getState()
      const updatedBlogs = state.blogs.map((b) =>
        b.id === response.id ? { ...response, user: b.user } : b
      )
      dispatch(setBlogs(updatedBlogs))
      return response
    } catch (e) {
      throw e
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    try {
      const response = await blogService.deleteRequest(blog.id)
      const state = getState()
      dispatch(setBlogs(state.blogs.filter((b) => b.id !== response.id)))
      return response
    } catch (e) {
      throw e
    }
  }
}

export default blogsSlice.reducer
