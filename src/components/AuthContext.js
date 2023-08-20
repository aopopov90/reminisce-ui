import React, { createContext, useContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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

  // Set the authorization header whenever the token changes
  useEffect(() => {
    if (authState.token) {
      console.log(`Setting axios default header to: ${authState.token}`)
      axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
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
