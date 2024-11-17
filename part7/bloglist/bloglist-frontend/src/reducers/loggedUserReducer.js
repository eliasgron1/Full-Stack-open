import { createSlice } from '@reduxjs/toolkit'
import { setToken } from '../util/blogsUtil.js'
import loginService from '../services/login.js'

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = loggedUserSlice.actions

export const checkLocalStorage = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(loggedUser))
      setToken(loggedUser.token)
    }
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      if (!credentials.username || !credentials.password) {
        throw new Error('username and password are required')
      }
      const response = await loginService.sendLoginRequest({
        username: credentials.username,
        password: credentials.password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser',
        JSON.stringify(response)
      )
      dispatch(setUser(response))
      setToken(response.token)
      return response
    } catch (e) {
      throw e
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser')
    setToken(null)
    dispatch(setUser(null))
  }
}

export default loggedUserSlice.reducer
