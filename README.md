# User Authentication System

## Objective

Develop an engaging user interface that facilitates user login, registration, and displays account information effectively post-login.

## Project Description

This project implements a secure authentication system using **React.js**/**MUI**/**Tailwindcss** for the frontend and **Node.js**/**Express.js**/**MySql** for backend processing.

## Features

### Login System

- **Form Input:** Users enter their email and password.
- **Credential Validation:** User details are checked against the database.
- **OTP Authentication:** A 6-digit OTP is generated upon successful login, expiring in 10 minutes.
- **User Redirection:** After OTP verification, users are redirected to a "Thank You" page displaying a personalized message and account details.
- **Error Handling:** Incorrect login attempts lead to an error page with "Sorry, we can't log you in."

### Registration System

- **Account Creation:** A "Create Account" button navigates users to a registration form.
- **Form Fields:** Collects name, email, password, company name, age, date of birth, and an image (PNG/JPG format required).
- **Data Validation:** Ensures valid email format and case-sensitive password.
- **Image Storage:** Stores uploaded images in the database, linking them to the user’s email.

### Account Management

- **Account Deletion:** Users can remove their accounts from the "Thank You" page.

## Technical Requirements

- **Frontend:** Developed with **React.js** or **Next.js** for a responsive UI.
- **Backend:** Built with **Node.js** for handling authentication and database operations.
- **Database:** Stores user information, authentication tokens, and uploaded images.
- **HTTP Communication:** Uses appropriate HTTP methods for API interactions.
- **Form Validation:** Implements robust validation for email and password fields.

## Installation & Setup

### Prerequisites

- Node.js (Latest LTS Version)
- MongoDB or MySQL (as per your preference)
- Git

### Steps to Run the Project

1. **Clone the Repository**

   ```sh
   git clone https://github.com/your-repo/auth-system.git
   cd auth-system
   ```

2. **Backend Setup**

   ```sh
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup**

   ```sh
   cd frontend
   npm install
   npm start
   ```

4. **Environment Variables**
   Create a `.env` file in the backend and frontend directories:

   ```env
   # Backend .env
   #Email
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=muku9783@gmail.com
   SMTP_APP_PASSWORD=-------

   #JWT
   JWT_SECRET =------
   SECRET_KEY=-------

   # Database
   DB_NAME=defaultdb
   DB_USER=avnadmin
   DB_PASSWORD=------
   DB_HOST=------
   DB_DIALECT=mysql
   DB_PORT=20223

   ```


````

```env
# Frontend .env
REACT_APP_API_URL=http://localhost:3000
````

## API Endpoints

### Authentication Routes

- `POST /register` - Registers a new user.
- `POST /login` - Authenticates user credentials.
- `POST /verify-otp` - Verifies the OTP.
- `DELETE /user/:id` - Deletes the user account.
- `POST /forgot-password` - Forgot Password.
- `POST /reset-password` - Reset Password.
- `POST /upload` - Image Upload.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss the changes.
