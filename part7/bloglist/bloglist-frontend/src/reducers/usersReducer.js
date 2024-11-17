import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users.js'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const fetchSavedUsers = () => {
  return async (dispatch) => {
    try {
      const response = await usersService.getAll()
      dispatch(setUsers(response))
      return response
    } catch (e) {
      console.error('error fetching users')
    }
  }
}

export default usersSlice.reducer
