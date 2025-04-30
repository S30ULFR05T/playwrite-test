import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [activeOption, setActiveOption] = useState('Profiles');

  return (
    <div className='main-container'>
      <div className="navbar-container">
        <div className="logo">
          <h2>Profile <span>Hub</span></h2>
        </div>
        <div className="options">
          <p
            className={activeOption === 'Profiles' ? 'active-option' : ''}
            onClick={() => setActiveOption('Profiles')}
          >
            Profiles
          </p>
          <p
            className={activeOption === 'Sign Up' ? 'active-option' : ''}
            onClick={() => setActiveOption('Sign Up')}
          >
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
