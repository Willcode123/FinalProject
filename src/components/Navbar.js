import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../images/logo.png';

const Navbar = () => {
  return (
    <div className="homez">
      <nav>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
      
        <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li> 
              <div className="mr">
                <Link to="/movie-reviews">Movie Reviews</Link>
              </div>
            </li>
            <li> 
              <div className="contact">
                <Link to="/contact">Contact Us</Link>
              </div>
            </li>
          </ul>
        </nav>
      </nav>
    </div>
  );
};

export default Navbar;
