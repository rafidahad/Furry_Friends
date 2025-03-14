import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Link as MuiLink } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ Backend connection
import "./LoginSignUp.css"; // ✅ Keep UI styles
import furryLogo from "../assets/furryFriends_header_logo.png";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "", // ✅ Added username
    firstName: "",
    surname: "",
    day: "1",
    month: "Jan",
    year: "2000",
    gender: "Female",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/auth/signup", formData);

      localStorage.setItem("token", response.data.token); // ✅ Store JWT token
      navigate("/otp", { state: { email: formData.email } }); // ✅ Redirect to OTP page
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <Box className="login-wrapper">
      {/* Logo */}
      <div className="signup-header">
        <img src={furryLogo} alt="Website Logo" />
        <Typography className="header-title">Create a new account</Typography>
        <Typography variant="subtitle1" color="textSecondary">It’s quick and easy.</Typography>
      </div>

      <Card>
        <CardContent>
          {error && <Typography color="error" align="center" sx={{ mb: 2 }}>{error}</Typography>}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <TextField name="username" label="Username" fullWidth value={formData.username} onChange={handleChange} sx={{ mb: 2 }} />

            {/* First Name & Surname */}
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField name="firstName" label="First name" fullWidth value={formData.firstName} onChange={handleChange} />
              <TextField name="surname" label="Surname" fullWidth value={formData.surname} onChange={handleChange} />
            </Box>

            {/* Date of Birth */}
            <Box className="dob-container">
              <FormControl size="small">
                <InputLabel>Day</InputLabel>
                <Select name="day" value={formData.day} onChange={handleChange}>
                  {[...Array(31)].map((_, i) => <MenuItem key={i} value={String(i + 1)}>{i + 1}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl size="small">
                <InputLabel>Month</InputLabel>
                <Select name="month" value={formData.month} onChange={handleChange}>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                </Select>
              </FormControl>

              <FormControl size="small">
                <InputLabel>Year</InputLabel>
                <Select name="year" value={formData.year} onChange={handleChange}>
                  {Array.from({ length: 70 }, (_, i) => 2025 - i).map((y) => <MenuItem key={y} value={String(y)}>{y}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>

            {/* Gender */}
            <RadioGroup row name="gender" value={formData.gender} onChange={handleChange} sx={{ justifyContent: "space-between", mb: 2 }}>
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
            </RadioGroup>

            {/* Email */}
            <TextField name="email" label="Email" fullWidth sx={{ mb: 2 }} value={formData.email} onChange={handleChange} />

            {/* Password */}
            <TextField name="password" label="New password" type="password" fullWidth sx={{ mb: 2 }} value={formData.password} onChange={handleChange} />

            {/* Disclaimer */}
            <Typography variant="caption" sx={{ display: "block", mb: 2, color: "text.secondary" }}>
              By clicking Sign Up, you agree to our Terms, Data Policy, and Cookies Policy.
            </Typography>

            {/* Sign Up Button */}
            <Button type="submit" fullWidth className="signup-btn">Sign Up</Button>

            {/* Already have an account? */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <MuiLink component={RouterLink} to="/" underline="hover">Already have an account?</MuiLink>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
