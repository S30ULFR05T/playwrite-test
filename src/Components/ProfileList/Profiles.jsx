import React, { useEffect, useState } from 'react'
import './Profiles.css'
import { useNavigate } from 'react-router-dom';

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // React Router hook

  const handleEdit = (profile) => {
    navigate(`/signup/${profile.id}`, { state: { profile } });
  };

  useEffect(() => {
    fetch('http://localhost/playwrite-test-backend/profile.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          setProfiles(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch profiles');
        }
      })
      .catch((error) => {
        console.error('Error fetching profiles:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="profile-list-page">
      <h2 className="profile-heading">List of all Profiles</h2>

      {loading ? (
        <p>Loading profiles...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <div className="table-container">
          <table className="profile-table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Password</th>
                <th>DOB</th>
                <th>City</th>
                <th>State</th>
                <th>Action</th> 
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{profile.firstname}</td>
                  <td>{profile.lastname}</td>
                  <td>{profile.email}</td>
                  <td>{profile.phone}</td>
                  <td>{profile.password}</td>
                  <td>{profile.dob}</td>
                  <td>{profile.city}</td>
                  <td>{profile.state}</td>
                  <td>
              <button onClick={() => handleEdit(profile)}>Edit</button>
            </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Profiles;
