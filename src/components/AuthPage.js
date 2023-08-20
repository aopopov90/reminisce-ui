import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import { API_URL } from '../config/config';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const AuthPage = () => {
  const { authDispatch } = useAuth(); // Get authDispatch from the context
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false); // State to control form visibility

  const handleLoginSubmit = async () => {
    // ... Login submit logic
  };

  const handleRegisterSubmit = async () => {
    try {
      // Make API call to register the user
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await response.json();
  
      // Decode the JWT token to extract user information
      const decodedToken = jwt_decode(data.token);
      const userEmail = decodedToken.sub; // Assuming the email is stored in the 'sub' claim
      console.log(`User: ${userEmail}`);
  
      // Set the token as a cookie with an expiration date
      authDispatch({ type: 'SET_TOKEN', payload: data.token });
  
      // Dispatch action to update the context with the new token and user email
      authDispatch({ type: 'SET_USER_INFO', payload: { email: userEmail } });
  
      // Handle successful registration
      console.log('Registered and logged in successfully:', data.token);
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error.message);
    }
  };

  const toggleRegistrationForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };

  return (
    <Container maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Login</Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLoginSubmit}>Login</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Register</Typography>
          {/* Show the registration form when the "Register" button is clicked */}
          {!showRegistrationForm ? (
            <Button variant="contained" color="primary" fullWidth onClick={toggleRegistrationForm}>
              Register
            </Button>
          ) : (
            <div>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <Button variant="contained" color="primary" fullWidth onClick={handleRegisterSubmit}>
                Register
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthPage;
