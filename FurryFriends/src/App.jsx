// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import { lightTheme, darkTheme } from './theme';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import AdoptionPage from './pages/AdoptionPage'; //
import Popular from './pages/Popular';
import AdoptAPetPage from './pages/AdoptAPetPage';
import MyProfile from './pages/MyProfile';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleTheme = () => {
    console.log("Theme toggled");
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home toggleTheme={toggleTheme} darkMode={darkMode} />} />
          <Route path="/adoption" element={<AdoptionPage />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/adopt_a_pet" element={<AdoptAPetPage />} />
          <Route path="/myprofile" element={<MyProfile />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;