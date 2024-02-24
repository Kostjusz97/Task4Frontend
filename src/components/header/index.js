import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './headerStyle.css'

const Header = ({ isLoggedOut, handleToggleLogout }) => {
  const username = localStorage.getItem('username');

  return (
    <Navbar >
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav >
          {!isLoggedOut ? (
              <>
                Hello, {username}!
                <Link to="/" onClick={() => handleToggleLogout()}>Log out</Link>
              </>
            ) : (
                <>
                  <Link to="/login">Login</Link>{' '}
                  <Link to="/register">Register</Link>
                </> 
              )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
