import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="navbar-links">
      <Link className="navbar-link" to="/">Blogs</Link>
      <Link className="navbar-link" to="/users">Users</Link>
    </div >
  )
}

export default NavBar
