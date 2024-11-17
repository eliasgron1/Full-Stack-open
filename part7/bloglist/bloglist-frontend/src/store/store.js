import { configureStore } from '@reduxjs/toolkit'
import blogReducer from '../reducers/blogReducer'
import loggedUserReducer from '../reducers/loggedUserReducer'
import notificationReducer from '../reducers/notificationReducer'
import usersReducer from '../reducers/usersReducer'
import commentsReducer from '../reducers/commentsReducer'

const rootReducer = configureStore({
  reducer: {
    blogs: blogReducer,
    loggedUser: loggedUserReducer,
    notification: notificationReducer,
    users: usersReducer,
    comments: commentsReducer,
  },
})

export default rootReducer
