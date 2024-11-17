import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'

import { useSelector } from 'react-redux'

const Home = ({ loggedUser, blogs }) => {
  const message = useSelector((state) => state.notification)
  return (
    <div>
      <BlogForm user={loggedUser} />

      <Notification message={message} />

      <BlogList blogs={blogs} />
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="card notification">{message}</div>
}

export default Home
