import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Home from "./pages/Home";
import { lightTheme, darkTheme } from "./theme";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import AdoptionPage from "./pages/AdoptionPage";
import Popular from "./pages/Popular";
import AdoptAPetPage from "./pages/AdoptAPetPage";
import MyProfile from "./pages/MyProfile";
import OtpPage from "./pages/OtpPage";
import PrivateRoute from "./components/PrivateRoute";
import PetAccessories from "./pages/PetAccessories";
const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
          <Route path="/otp" element={isAuthenticated ? <Navigate to="/home" /> : <OtpPage />} />

          {/* Private Routes - Pass toggleTheme and darkMode to pages using Navbar */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/adoption" element={<AdoptionPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/popular" element={<Popular toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/adopt_a_pet" element={<AdoptAPetPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/myprofile" element={<MyProfile toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/pet-accessories" element={<PetAccessories />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
