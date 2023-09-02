import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sessions from './components/Sessions';
import Session from './components/Session';
import DrawerAppBar from './components/DrawerAppBar';
import AuthPage from './components/AuthPage';
import { AuthProvider } from './components/AuthContext';

const Home = () => (
  <div>
    <h1>Home</h1>
    <p>Welcome to the home page!</p>
  </div>
);

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => (
  <AuthProvider>
    <Router>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div>
          <DrawerAppBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/:sessionId" element={<Session />} />
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  </AuthProvider>
);

export default App;
