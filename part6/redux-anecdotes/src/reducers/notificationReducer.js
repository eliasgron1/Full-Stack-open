import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationText(state, action) {
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

export const { removeNotification, setNotificationText } = notificationSlice.actions

export const setNotification = (text, time) => {
  return (dispatch) => {
    console.log('notification:', text, 'for:', time, 'ms')
    dispatch(setNotificationText(text))
    setTimeout(() => {
      console.log('removing notification')
      dispatch(removeNotification())
    }, time)
  }
}

export default notificationSlice.reducer