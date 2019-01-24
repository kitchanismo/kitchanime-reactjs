import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Nav = ({ user }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          KITCHANIME
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/winter">
              Winter
            </NavLink>
            <NavLink className="nav-item nav-link" to="/spring">
              Spring
            </NavLink>
            <NavLink className="nav-item nav-link" to="/summer">
              Summer
            </NavLink>
            <NavLink className="nav-item nav-link" to="/fall">
              Fall
            </NavLink>
          </div>
        </div>
      </nav>
      <style jsx>{`
        .navbar {
          margin-bottom: 20px;
        }
      `}</style>
    </React.Fragment>
  )
}

export default Nav
