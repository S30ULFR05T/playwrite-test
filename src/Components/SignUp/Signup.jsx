import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
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
    firstname: '',
    email: '',
    phone: '',
    dob: '',
    state: '',
    general: '' // ✅ Added for optional general error message
  });

  const [successMessage, setSuccessMessage] = useState(''); // ✅ Added for Playwright to detect
  const { id } = useParams();
  const location = useLocation();

  // ✅ Load existing profile data if editing
  useEffect(() => {
    if (location.state?.profile) {
      setFormData({ ...location.state.profile, rePassword: location.state.profile.password });
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password' || e.target.name === 'rePassword') {
      setFormErrors({ ...formErrors, passwordMismatch: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newFormErrors = {};
    if (formData.password !== formData.rePassword) {
      newFormErrors.passwordMismatch = 'Passwords do not match.';
    }

    // Check for empty fields and add error messages
    if (!formData.firstname) newFormErrors.firstname = 'First name is required.';
    if (!formData.email) newFormErrors.email = 'Email is required.';
    if (!formData.phone) newFormErrors.phone = 'Phone number is required.';
    if (!formData.dob) newFormErrors.dob = 'Date of birth is required.';
    if (!formData.state) newFormErrors.state = 'State is required.';

    // ✅ Optional generic error message for Playwright/general UI
    if (Object.keys(newFormErrors).length > 0) {
      newFormErrors.general = 'Please fill out all required fields.';
      setFormErrors(newFormErrors);
      return;
    }

    // Proceed with form submission if no errors
    const method = id ? 'PUT' : 'POST';
    const endpoint = id
      ? `http://localhost/playwrite-test-backend/editprofile.php?id=${id}`
      : 'http://localhost/playwrite-test-backend/signup.php';

    const payload = { ...formData };
    delete payload.rePassword; //Don't send rePassword to the backend

    fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        // Show success message visibly on screen for Playwright to detect
        if (data.message) {
          setSuccessMessage(data.message);
        } else {
          setSuccessMessage('User signed up successfully'); // fallback
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="signup-page">
      <h2 className="signup-heading">{id ? 'Update Profile' : 'Sign Up for Profile'}</h2>
      <div className="form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Update input fields to use value and onChange */}
          <div className="form-row">
            <div className="form-group">
              <label>First Name*</label>
              <input name="firstname" type="text" placeholder="Enter your first name" value={formData.firstname} onChange={handleChange} />
              {/* Show error message if firstname is missing */}
              {formErrors.firstname && <div className="error-message">{formErrors.firstname}</div>}
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastname" type="text" placeholder="Enter your last name" value={formData.lastname} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email Address*</label>
              <input name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              {/* Show error message if email is missing */}
              {formErrors.email && <div className="error-message">{formErrors.email}</div>}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input name="phone" type="tel" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />
              {/* Show error message if phone number is missing */}
              {formErrors.phone && <div className="error-message">{formErrors.phone}</div>}
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
              {/* Show error message if dob is missing */}
              {formErrors.dob && <div className="error-message">{formErrors.dob}</div>}
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
              {/* Show error message if state is missing */}
              {formErrors.state && <div className="error-message">{formErrors.state}</div>}
            </div>
          </div>

          <button className="signup-button" type="submit">{id ? 'Update' : 'Sign Up'}</button>
        </form>

        {/* ✅ Success message container for Playwright to detect */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* ✅ Optional general error message for Playwright */}
        {formErrors.general && (
          <div className="error-message">{formErrors.general}</div>
        )}
      </div>
    </div>
  );
}

export default Signup;
