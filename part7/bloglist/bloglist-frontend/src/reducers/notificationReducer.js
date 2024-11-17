import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return null
    },
  },
})

export const { setNotification, resetNotification } = notificationSlice.actions

export const showNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
