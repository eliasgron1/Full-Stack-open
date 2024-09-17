import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

// Login form with fields for password and username
const Login = ({ user, setUser, showNotification }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  // handle login, attempt with correct credentials returns user obj
  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        password,
        username
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      console.log('login successful, user:', user)
    }
    catch (exception) {
      showNotification('wrong username or password')
      console.log('error', exception)
    }
  }

  // handle logging out, clears local browser storage
  const logoutHandler = (event) => {
    event.preventDefault()
    setUser('')
    blogService.setToken('')
    window.localStorage.clear()
    console.log('user logged out')
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
      </form >
    )
  }
  else {
    return (
      <div>
        logged in as {user.name}
        <button
          onClick={logoutHandler}
        >
          log out
        </button>
      </div>
    )
  }
}

export default Login
