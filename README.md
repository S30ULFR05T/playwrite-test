# ProfileHub

ProfileHub is a web application built with React for managing user profiles. It includes features for signing up, editing profiles, and viewing a list of all profiles. The backend is implemented in PHP and uses a MySQL database.

## Features

- User signup with form validation.
- Edit existing profiles.
- View a list of all profiles.
- Backend API for managing user data.
- End-to-end testing with Playwright.

---

## Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js** (v16 or later)
2. **npm** (comes with Node.js)
3. **XAMPP** (or any other local server with PHP and MySQL support)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd playwrite-test

-----------------------------------------

2. Install Dependencies
Run the following command to install the required dependencies:

npm install



3. Set Up the Database
Open XAMPP and start the Apache and MySQL services.
Open phpMyAdmin by navigating to http://localhost/phpmyadmin in your browser.
Create a new database named playwrite-test-db.
Import the database schema<vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'>: </vscode_annotation> - Go to the Import tab in phpMyAdmin.
Select the file located at backend/db/users.sql.
Click Go to import the database schema and sample data.




4. Configure the Backend
Ensure the backend files are located in the htdocs folder of your XAMPP installation. For example:

C:\xampp\htdocs\playwrite-test-backend



Verify the database connection in backend/db.php:

<?php
$host = 'localhost';        // Database host
$username = 'root';         // Database username
$password = '';             // Database password
$database = 'playwrite-test-db'; // Database name



5. Start the Frontend
Run the following command to start the React development server:

npm start

The application will be available at http://localhost:3000.



6. Run Playwright Tests
To run the Playwright end-to-end tests:

Ensure the frontend is running on http://localhost:3000.
Run the following command:


npx playwright test



Project Structure

playwrite-test/
├── backend/                # Backend PHP files
│   ├── [db.php](http://_vscodecontentref_/1)              # Database connection
│   ├── [profile.php](http://_vscodecontentref_/2)         # Fetch profiles API
│   ├── [signup.php](http://_vscodecontentref_/3)          # Signup API
│   ├── [editprofile.php](http://_vscodecontentref_/4)     # Edit profile API
│   └── db/                 # Database schema
│       └── [users.sql](http://_vscodecontentref_/5)
├── public/                 # Public assets
├── src/                    # React frontend source code
│   ├── Components/         # React components
│   │   ├── Navbar/         # Navbar component
│   │   ├── ProfileList/    # Profile list component
│   │   └── SignUp/         # Signup form component
│   ├── [App.js](http://_vscodecontentref_/6)              # Main React app
│   ├── [index.js](http://_vscodecontentref_/7)            # React entry point
│   └── [setupTests.js](http://_vscodecontentref_/8)       # Jest setup
├── tests/                  # Playwright tests
│   └── [signup.spec.js](http://_vscodecontentref_/9)      # Signup form tests
├── [package.json](http://_vscodecontentref_/10)            # Project dependencies and scripts
├── [playwright.config.js](http://_vscodecontentref_/11)    # Playwright configuration
└── [README.md](http://_vscodecontentref_/12)               # Project documentation



API Endpoints
1. GET /profile.php
Fetches all user profiles.

2. POST /signup.php
Creates a new user profile.

3. PUT /editprofile.php?id={id}
Updates an existing user profile.



Troubleshooting
Common Issues
Database Connection Error

Ensure XAMPP is running and the database credentials in db.php are correct.
Frontend Not Loading

Ensure the React development server is running on http://localhost:3000.
Playwright Tests Failing

Verify that the frontend is running and accessible at http://localhost:3000.
