import Home from './Home'
import Users from './components/Users'
import User from './components/User'
import LoginForm from './components/LoginForm'
import ExpandedBlog from './components/ExpandedBlog'
import NavBar from './components/NavBar'

import { useMatch, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { checkLocalStorage } from './reducers/loggedUserReducer'
import { fetchSavedUsers } from './reducers/usersReducer'
import { initBlogs } from './reducers/blogReducer'

const App = () => {
  const loggedUser = useSelector((state) => state.loggedUser)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  // fetch users saved in database
  useEffect(() => {
    dispatch(fetchSavedUsers())
  }, [dispatch])

  // check for a saved user in local browser storage
  useEffect(() => {
    dispatch(checkLocalStorage())
  }, [])

  // fetch initial blogs in database
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const user =
    userMatch && users.length > 0
      ? users.find((user) => user.id === userMatch.params.id)
      : null

  const blogMatch = useMatch('/blogs/:id')
  const blog =
    blogMatch && blogs.length > 0
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null

  return (
    <>
      <div class="navbar card">
        <LoginForm user={loggedUser} />
        <NavBar />
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home loggedUser={loggedUser} blogs={blogs} />}
        />

        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<User user={user} />} />

        <Route path="/blogs" element={<Navigate to="/" />} />
        <Route
          path="/blogs/:id"
          element={<ExpandedBlog user={loggedUser} blog={blog} />}
        />
      </Routes>
    </>
  )
}

export default App
