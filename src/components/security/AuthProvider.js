import React, { createContext, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false
  });

  const authenticate = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
        email,
        password
      });
      const token = response.data.token;
      const user = jwtDecode(token);

      setAuthState({
        token,
        user,
        isAuthenticated: true
      });

      localStorage.setItem('token', token); // Store the token in local storage for persistence
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const logout = () => {
    setAuthState({
      token: null,
      user: null,
      isAuthenticated: false
    });

    localStorage.removeItem('token'); // Remove the token from local storage
  };

  // Check if a token exists in local storage
  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);

      setAuthState({
        token,
        user,
        isAuthenticated: true
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        authenticate,
        logout,
        checkToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
