import React from 'react';
import './Navbar.css';

function Navbar() {
    return(
        <nav className="navbar navbar-light d-flex justify-content-center">
          <a className="navbar-brand" href="/">
            <img src="/logo.png" width="56" height="56" alt="" />
          </a>
        </nav>
    );
}

export default Navbar;