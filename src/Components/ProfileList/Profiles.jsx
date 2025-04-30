import React from 'react'
import './Profiles.css'

function Profiles() {
  const profiles = [
    {
      firstName: 'Miles', lastName: 'Esther', email: 'debbie.baker@example.com',
      phone: '(205) 555-0100', password: '20796', dob: 'May 6, 2012',
      city: 'Orange', state: 'Alabama'
    },
    {
      firstName: 'Flores', lastName: 'Juanita', email: 'bill.sanders@example.com',
      phone: '(201) 555-0124', password: '93457', dob: 'Feb 11, 2014',
      city: 'Toledo', state: 'Alaska'
    },
    {
      firstName: 'Black', lastName: 'Marvin', email: 'tanya.hill@example.com',
      phone: '(252) 555-0126', password: '50364', dob: 'Aug 2, 2013',
      city: 'Fairfield', state: 'Colorado'
    },
    {
      firstName: 'Nguyen', lastName: 'Shane', email: 'nathan.roberts@example.com',
      phone: '(702) 555-0122', password: '39235', dob: 'Mar 6, 2018',
      city: 'Austin', state: 'Arkansas'
    },
    {
      firstName: 'Henry', lastName: 'Arthur', email: 'kenzi.lawson@example.com',
      phone: '(302) 555-0107', password: '74875', dob: 'Nov 7, 2017',
      city: 'Pembroke Pines', state: 'Connecticut'
    },
    {
      firstName: 'Cooper', lastName: 'Kristin', email: 'jackson.graham@example.com',
      phone: '(270) 555-0117', password: '45904', dob: 'Aug 7, 2017',
      city: 'Naperville', state: 'Arizona'
    }
  ];

  return (
    <div>
      <div className="profile-list-page">
      <h2 className="profile-heading">List of all Profiles</h2>
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
              <th>States</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{profile.firstName}</td>
                <td>{profile.lastName}</td>
                <td>{profile.email}</td>
                <td>{profile.phone}</td>
                <td>{profile.password}</td>
                <td>{profile.dob}</td>
                <td>{profile.city}</td>
                <td>{profile.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Profiles
