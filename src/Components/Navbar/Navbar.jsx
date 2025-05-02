import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [activeOption, setActiveOption] = useState('Profiles');

  return (
    <div className='main-container'>
      <div className="navbar-container">
        <div className="logo">
          <h2>Profile <span>Hub</span></h2>
        </div>
        <div className="options">
          <Link
            to="/"
            className={activeOption === 'Profiles' ? 'active-option' : ''}
            onClick={() => setActiveOption('Profiles')}
          >
            Profiles
          </Link>
          <Link
            to="/signup"
            className={activeOption === 'Sign Up' ? 'active-option' : ''}
            onClick={() => setActiveOption('Sign Up')}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
