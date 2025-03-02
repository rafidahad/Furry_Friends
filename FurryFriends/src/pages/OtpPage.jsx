// src/pages/OtpPage.jsx
import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import furryLogo from '../assets/furryFriends_header_logo.png';

export default function OtpPage() {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => setOtp(e.target.value);
  const handleVerify = () => {
    alert(`Verifying OTP: ${otp}`);
    // Here you would add your OTP verification logic
  };

  const handleCancel = () => {
    alert('Cancel clicked!');
    // Add cancel logic or redirect as needed
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* Top AppBar with your website logo */}
      <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 'none', borderBottom: '1px solid #ddd' }}>
        <Toolbar>
          <img src={furryLogo} alt="Website Logo" style={{ height: '40px' }} />
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 5,
          pb: 5,
        }}
      >
        <Card sx={{ width: 500, maxWidth: '90%', mt: 5 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
              Enter security code
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
              Please check your emails for a message with your code. Your code is 6 numbers long.
              <br />
              We sent your code to <strong>****@gmail.com</strong>
            </Typography>
            <TextField
              label="Enter code"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" onClick={handleCancel} sx={{ textTransform: 'none' }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleVerify}
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#1877f2',
                  '&:hover': { backgroundColor: '#166fe5' },
                }}
              >
                Continue
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
