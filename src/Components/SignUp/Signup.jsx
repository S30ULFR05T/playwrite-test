import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
    dob: '',
    city: '',
    state: ''
  });

  const [formErrors, setFormErrors] = useState({
    passwordMismatch: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'rePassword') {
      setFormErrors({ ...formErrors, passwordMismatch: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.rePassword) {
      setFormErrors({ ...formErrors, passwordMismatch: 'Passwords do not match.' });
      return;
    }

    fetch('http://localhost/playwrite-test-backend/singup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.text())
      .then(data => alert(data.message))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="signup-page">
      <h2 className="signup-heading">Sign Up for Profile</h2>
      <div className="form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Update input fields to use value and onChange */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name*</label>
              <input name="firstname" type="text" placeholder="Enter your first name" value={formData.firstname} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastname" type="text" placeholder="Enter your last name" value={formData.lastname} onChange={handleChange} />
            </div>
          </div>
          {/* Repeat for other fields with same pattern */}
          <div className="form-row">
            <div className="form-group">
              <label>Email Address*</label>
              <input name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" type="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password*</label>
              <input name="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} />
              <span className='password-span'>Use A-Z, a-z, 0-9, !@#$%^&*</span>
            </div>
            <div className="form-group">
              <label>Re - Password*</label>
              <input name="rePassword" type="password" placeholder="Re-enter password" value={formData.rePassword} onChange={handleChange} />
              {/* Show password mismatch error */}
              {formErrors.passwordMismatch && (
                <div className="error-message">{formErrors.passwordMismatch}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Date of Birth</label>
              <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>State</label>
              <input name="state" type="text" placeholder="State" value={formData.state} onChange={handleChange} />
            </div>
          </div>

          <button className="signup-button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
