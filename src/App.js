import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sessions from './components/Sessions';
import Session from './components/Session';
import DrawerAppBar from './components/DrawerAppBar';

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
  <Router>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <DrawerAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/sessions/:sessionId" element={<Session />} />
        </Routes>
      </div>
    </ThemeProvider>
  </Router>
);

export default App;
