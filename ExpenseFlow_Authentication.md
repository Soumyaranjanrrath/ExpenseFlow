# ExpenseFlow Authentication System Documentation

## Overview

ExpenseFlow includes a full-featured authentication system that allows users to:
- Register for a new account
- Log in to their existing account
- Access protected routes only when authenticated
- View their profile information
- Log out from the application

## How Authentication Works

The authentication system is built using JWT (JSON Web Tokens) for secure, stateless authentication. Here's how it works:

1. **Registration**: Users provide a username, email, and password to create a new account.
2. **Password Security**: Passwords are securely hashed using bcrypt before storage in the database.
3. **Login**: Users can log in with their email and password.
4. **Token Generation**: Upon successful login, the server generates a JWT token that contains the user's ID.
5. **Token Storage**: The token is stored in the browser's localStorage for persistent authentication.
6. **Protected Routes**: Certain routes require authentication and will redirect to the login page if the user is not authenticated.
7. **Authorization Header**: API requests to protected endpoints include the JWT token in the Authorization header.
8. **Logout**: Removes the token from localStorage, effectively logging the user out.

## User Flow

1. **New User**:
   - Navigates to the Register page
   - Fills out the registration form
   - Upon successful registration, is redirected to the Dashboard

2. **Returning User**:
   - Navigates to the Login page
   - Enters email and password
   - Upon successful login, is redirected to the Dashboard

3. **Authenticated User**:
   - Can access the Dashboard, Income, and Expenses pages
   - Can see their username in the header
   - Can log out using the Logout button

4. **Unauthenticated User**:
   - Will be redirected to the Login page when trying to access protected routes

## Technical Implementation

### Backend Components:

1. **User Model** (`backend/models/UserModel.js`):
   - Defines the user schema (username, email, password)
   - Includes methods for password hashing and verification

2. **Authentication Controller** (`backend/controllers/auth.js`):
   - Handles user registration
   - Handles user login
   - Provides user profile information

3. **Authentication Middleware** (`backend/middleware/authMiddleware.js`):
   - Verifies JWT tokens for protected routes
   - Attaches the user object to the request for use in controllers

4. **Authentication Routes** (`backend/routes/auth.js`):
   - Defines API endpoints for registration, login, and profile access

### Frontend Components:

1. **Authentication Context** (`frontend/src/context/authContext.js`):
   - Provides global access to authentication state and methods
   - Manages token storage and user information

2. **Login Component** (`frontend/src/Components/Auth/Login.js`):
   - Provides a form for user login
   - Handles form validation and submission

3. **Register Component** (`frontend/src/Components/Auth/Register.js`):
   - Provides a form for user registration
   - Handles form validation and submission

4. **Protected Route Component** (`frontend/src/Components/Auth/ProtectedRoute.js`):
   - Prevents unauthorized access to protected routes
   - Redirects unauthenticated users to the login page

5. **Header Profile Component** (`frontend/src/Components/Auth/HeaderProfile.js`):
   - Displays user information in the header
   - Provides a logout button

## API Endpoints

- **POST /api/v1/auth/register**: Register a new user
  - Request Body: `{ username, email, password }`
  - Response: User data and token

- **POST /api/v1/auth/login**: Log in a user
  - Request Body: `{ email, password }`
  - Response: User data and token

- **GET /api/v1/auth/me**: Get the current user's profile (protected)
  - Headers: `Authorization: Bearer {token}`
  - Response: User data

## Authentication Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Register   │────▶│   Login     │────▶│  Dashboard  │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                   │
                           │                   │
                           ▼                   ▼
                    ┌─────────────┐    ┌─────────────┐
                    │             │    │             │
                    │  JWT Token  │    │   Logout    │
                    │             │    │             │
                    └─────────────┘    └─────────────┘
                           │                   │
                           │                   │
                           ▼                   ▼
                    ┌─────────────┐    ┌─────────────┐
                    │  Protected  │    │             │
                    │   Routes    │────▶│   Login     │
                    │             │    │             │
                    └─────────────┘    └─────────────┘
``` 