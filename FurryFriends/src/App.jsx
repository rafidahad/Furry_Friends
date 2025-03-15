// src/App.jsx
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

// Pet Topics
import Dogs from "./pages/PetTopics/Dogs";
import Cats from "./pages/PetTopics/Cats";
import Birds from "./pages/PetTopics/Birds";
import Ferrets from "./pages/PetTopics/Ferrets";
import Fish from "./pages/PetTopics/Fish";
import GuineaPigs from "./pages/PetTopics/GuineaPigs";
import Hamsters from "./pages/PetTopics/Hamsters";
import Rabbits from "./pages/PetTopics/Rabbits";
import Reptiles from "./pages/PetTopics/Reptiles";
import About from "./pages/AboutPolicy/About";
import Help from "./pages/AboutPolicy/Help";
import PrivacyPolicy from "./pages/AboutPolicy/PrivacyPolicy";
import UserAgreement from "./pages/AboutPolicy/UserAgreement";
import Rules from "./pages/AboutPolicy/Rules";
import SeekHelp from "./pages/AboutPolicy/SeekHelp";

import PetAccessories from "./pages/PetAccessories";
import VetLocator from './pages/VetLocator';

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

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/adoption" element={<AdoptionPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/popular" element={<Popular toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/adopt_a_pet" element={<AdoptAPetPage toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/myprofile" element={<MyProfile toggleTheme={toggleTheme} darkMode={darkMode} />} />

            {/* Pet Topics */}
            <Route path="/dogs" element={<Dogs toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/cats" element={<Cats toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/birds" element={<Birds toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/rabbits" element={<Rabbits toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/hamsters" element={<Hamsters toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/guinea-pigs" element={<GuineaPigs toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/reptiles" element={<Reptiles toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/ferrets" element={<Ferrets toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/fish" element={<Fish toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/about" element={<About toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/help" element={<Help toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/user-agreement" element={<UserAgreement toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/rules" element={<Rules toggleTheme={toggleTheme} darkMode={darkMode} />} />
            <Route path="/seek-help" element={<SeekHelp toggleTheme={toggleTheme} darkMode={darkMode} />} />

            <Route path="/pet-accessories" element={<PetAccessories />} />
            <Route path="/vet-locator" element={<VetLocator toggleTheme={toggleTheme} darkMode={darkMode} />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
