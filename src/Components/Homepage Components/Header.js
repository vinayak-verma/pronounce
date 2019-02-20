import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-md bg-dark navbar-dark">
          <Link to='/'><a className="navbar-brand app-logo">Pronounce</a></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <Link to='/infoPage'>
                <li className="nav-item">
                  <a className="nav-link nav-link-items">How Pronounce works</a>
                </li>
              </Link>
              <Link to='/login'>
                <li className="nav-item">
                  <a className="nav-link nav-link-items">Login/Sign Up</a>
                </li>
              </Link>
              <Link to='/register'>
                <li className="nav-item">
                  <a className="nav-link nav-link-items">Register as a student</a>
                </li>
              </Link>
              <Link to='/contactUs'>
                <li className="nav-item">
                  <a className="nav-link nav-link-items">Contact Us</a>
                </li>
              </Link>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;














