import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { API_URL } from '../config/config';

// Define constants
const TOKEN_COOKIE_EXPIRY_DAYS = 7;

// Define the initial state of the authentication context
const initialAuthState = {
  token: Cookies.get('token') || null, // Read the token from cookies
  user: {
    firstName: null,
    lastName: null,
    email: Cookies.get('token') ? jwt_decode(Cookies.get('token'))['sub'] : null,
  },
};

// set default auth header
axios.defaults.headers.common['Authorization'] = `Bearer ${Cookies.get('token')}`;

// Define action types for the reducer
const SET_TOKEN = 'SET_TOKEN';
const CLEAR_TOKEN = 'CLEAR_TOKEN';
const SET_USER_INFO = 'SET_USER_INFO';
const CLEAR_USER_INFO = 'CLEAR_USER_INFO';

// Define the reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      Cookies.set('token', action.payload, { expires: TOKEN_COOKIE_EXPIRY_DAYS }); // Store the token in cookies
      return { ...state, token: action.payload };
    case CLEAR_TOKEN:
      Cookies.remove('token'); // Remove the token from cookies
      return { ...state, token: null };
    case SET_USER_INFO:
      console.log('Setting user info:', action.payload);
      return { ...state, user: action.payload };
    case CLEAR_USER_INFO:
      return { ...state, user: initialAuthState.user };
    default:
      return state;
  }
};

// Create the authentication context
const AuthContext = createContext();


// Create an AuthProvider component to provide the context value
export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  const handleTokenRefresh = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/auth/refresh`,
        { token: authState.token }, // Send the token in the request body
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const refreshedData = response.data;
      authDispatch({ type: SET_TOKEN, payload: refreshedData.token });
    } catch (error) {
      console.error('Token refresh error:', error.message);
    }
  };
  
  // Set the authorization header whenever the token changes
  useEffect(() => {
    if (authState.token) {
      // Check if the token is close to expiration and refresh it
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (authState.tokenExpiration - currentTime <= 300) {
        handleTokenRefresh();
      }
      // Set the authorization header with the token
      console.log(`Setting axios default header to: ${authState.token}`)
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;

      // Set up an interval to periodically check and refresh the token
      const tokenRefreshInterval = setInterval(() => {
        // if (authState.tokenExpiration - currentTime <= 300) {
            handleTokenRefresh();
        // }
      }, 60000); // Check every 60 seconds
  
      // Clean up the interval when unmounting
      return () => clearInterval(tokenRefreshInterval);
    } else {
      console.log('Deleting axios header')
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authState.token]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
