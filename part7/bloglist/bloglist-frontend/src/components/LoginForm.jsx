import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../reducers/loggedUserReducer'
import { showNotification } from '../reducers/notificationReducer'

// Login form with fields for password and username
const LoginForm = ({ user }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()

  const loginHandler = async (event) => {
    event.preventDefault()
    const credentials = {
      username,
      password,
    }
    dispatch(login(credentials))
      .then((response) => {
        dispatch(showNotification(`logged in as ${response.username}`))
        setUsername('')
        setPassword('')
      })
      .catch((e) => {
        console.error('error:', e)
        dispatch(showNotification(`wrong username or password`))
      })
  }

  const logoutHandler = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  if (!user) {
    return (
      <form onSubmit={loginHandler}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">log in</button>
      </form>
    )
  } else {
    return (
      <div>
        logged in as {user.name}
        <button class="logout-button" onClick={logoutHandler}>log out</button>
      </div>
    )
  }
}

export default LoginForm
