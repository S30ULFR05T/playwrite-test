import React from 'react'
import './Signup.css'

function Signup() {
  return (
    <div>
      <div className="signup-page">
      <h2 className="signup-heading">Sign Up for Profile</h2>
      <div className="form-container">
        <form className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label>First Name*</label>
              <input type="text" placeholder="Enter your first name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Enter your last name" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address*</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password*</label>
              <input type="password" placeholder="Enter password" />
              <span className='password-span'>Use A-Z, a-z, 0-9, !@#$%^&*</span>
            </div>
            <div className="form-group">
              <label>Re - Password*</label>
              <input type="password" placeholder="Re-enter password" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Date of Birth</label>
              <input type="date" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" placeholder="City" />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" placeholder="State" />
            </div>
          </div>

          <button className="signup-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Signup
