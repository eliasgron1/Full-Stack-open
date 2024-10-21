import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		setNotification(state, action) {
			return action.payload.notification
		},
		removeNotification() {
			return ''
		}
	}
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer