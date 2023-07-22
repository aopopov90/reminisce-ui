import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BasicMenu from './components/BasicMenu';
import Sessions from './components/Sessions';

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
        <BasicMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sessions" element={<Sessions />} />
        </Routes>
      </div>
    </ThemeProvider>
  </Router>
);

export default App;
