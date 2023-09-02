import React, { useState } from 'react';
import { TextField, Button, Container, Grid, Typography } from '@mui/material';
import { useAuth } from './AuthContext';
import { API_URL } from '../config/config';
import jwt_decode from 'jwt-decode';

const AuthPage = () => {
  const { authDispatch } = useAuth();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleLoginSubmit = async () => {
    try {
      // Make API call to authenticate the user
      const response = await fetch(`${API_URL}/api/v1/auth/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await response.json();

      // Decode the JWT token to extract user information
      const decodedToken = jwt_decode(data.token);
      const userEmail = decodedToken.sub; // Assuming the email is stored in the 'sub' claim

      // Set the token as a cookie with an expiration date
      authDispatch({ type: 'SET_TOKEN', payload: data.token });

      // Dispatch action to update the context with the new token and user email
      authDispatch({ type: 'SET_USER_INFO', payload: { email: userEmail } });

      // Handle successful login
      console.log('Logged in successfully:', data.token);
    } catch (error) {
      // Handle login error
      console.error('Login error:', error.message);
    }
  };

  const handleRegisterSubmit = async () => {
    try {
      // Make API call to register the user
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: registerFirstName,
          lastName: registerLastName,
          email: registerEmail,
          password: registerPassword,
        }),
      });
      const data = await response.json();

      // Decode the JWT token to extract user information
      const decodedToken = jwt_decode(data.token);
      const userEmail = decodedToken.sub; // Assuming the email is stored in the 'sub' claim

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
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLoginSubmit}>Login</Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">Register</Typography>
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
                value={registerFirstName}
                onChange={(e) => setRegisterFirstName(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                value={registerLastName}
                onChange={(e) => setRegisterLastName(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                style={{ marginBottom: '1rem' }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
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
