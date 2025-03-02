// src/pages/SignupFacebookStyle.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link as MuiLink
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import furryLogo from '../assets/furryFriends_header_logo.png';

export default function SignupFacebookStyle() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    day: '1',
    month: 'Jan',
    year: '2000',
    gender: 'Female',
    emailOrPhone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Send a POST request to the backend signup endpoint
      const res = await axios.post('http://localhost:27017/users', {
        firstName: formData.firstName,
        surname: formData.surname,
        emailOrPhone: formData.emailOrPhone,
        password: formData.password,
        day: formData.day,
        month: formData.month,
        year: formData.year,
        gender: formData.gender,
      });
      console.log("User created:", res.data);
      // On success, redirect to the OTP page
      navigate('/otp');
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f0f2f5',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
      }}
    >
      {/* Website Logo */}
      <img 
        src={furryLogo} 
        alt="Website Logo" 
        style={{ maxHeight: '80px', marginBottom: '20px' }} 
      />

      <Card sx={{ width: 432, borderRadius: 2 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, textAlign: 'center' }}>
            Create a new account
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}
          >
            It’s quick and easy.
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ textAlign: 'center', mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit}>
            {/* First name and surname */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                name="firstName"
                label="First name"
                variant="outlined"
                size="small"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
              />
              <TextField
                name="surname"
                label="Surname"
                variant="outlined"
                size="small"
                fullWidth
                value={formData.surname}
                onChange={handleChange}
              />
            </Box>

            {/* Date of birth */}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <FormControl size="small" fullWidth>
                <InputLabel id="day-label">Day</InputLabel>
                <Select
                  labelId="day-label"
                  name="day"
                  label="Day"
                  value={formData.day}
                  onChange={handleChange}
                >
                  {[...Array(31)].map((_, i) => (
                    <MenuItem key={i} value={String(i + 1)}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel id="month-label">Month</InputLabel>
                <Select
                  labelId="month-label"
                  name="month"
                  label="Month"
                  value={formData.month}
                  onChange={handleChange}
                >
                  {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" fullWidth>
                <InputLabel id="year-label">Year</InputLabel>
                <Select
                  labelId="year-label"
                  name="year"
                  label="Year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  {Array.from({ length: 70 }, (_, i) => 2025 - i).map((y) => (
                    <MenuItem key={y} value={String(y)}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Gender */}
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Gender
            </Typography>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              sx={{ justifyContent: 'space-between', mb: 2 }}
            >
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
            </RadioGroup>

            {/* Mobile or email */}
            <TextField
              name="emailOrPhone"
              label="Mobile number or email address"
              variant="outlined"
              size="small"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.emailOrPhone}
              onChange={handleChange}
            />

            {/* Password */}
            <TextField
              name="password"
              label="New password"
              variant="outlined"
              size="small"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              value={formData.password}
              onChange={handleChange}
            />

            {/* Disclaimer text */}
            <Typography variant="caption" sx={{ display: 'block', mb: 2, color: 'text.secondary' }}>
              People who use our service may have uploaded your contact information to FurryFriends. Learn more.
              <br />
              By clicking Sign Up, you agree to our Terms, Data Policy and Cookies Policy. You may receive SMS notifications from us and can opt out at any time.
            </Typography>

            {/* Sign Up button */}
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              sx={{ fontWeight: 'bold', textTransform: 'none', mb: 2 }}
            >
              Sign Up
            </Button>

            {/* Already have an account? */}
            <Box sx={{ textAlign: 'center' }}>
              <MuiLink
                component={RouterLink}
                to="/"
                underline="hover"
                sx={{ fontSize: 14 }}
              >
                Already have an account?
              </MuiLink>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
