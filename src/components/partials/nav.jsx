import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import auth from '../../services/authService'
import { capitalize } from '../../services/utilsService'

const Nav = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            KITCHANIME
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav" style={{ marginBottom: '20px' }}>
              {auth.isValidUser() && (
                <React.Fragment>
                  <i
                    className="fa fa-user  text-warning"
                    style={{ marginTop: '12px !important' }}
                  />
                  <li className="nav-item">
                    <NavLink className="nav-link active" to="/home">
                      {capitalize(auth.getCurrentUser().username)}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/login"
                      onClick={() => auth.logout()}
                    >
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}

              {!auth.isValidUser() && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  )
}

export default Nav
