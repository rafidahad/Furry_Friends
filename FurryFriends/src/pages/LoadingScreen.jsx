import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
        p: 2,
      }}
    >
      <PetsIcon
        sx={{
          fontSize: 80,
          mb: 2,
          animation: 'spin 2s linear infinite',
        }}
      />
      <CircularProgress size={60} color="primary" sx={{ mb: 2 }} />
      <Typography variant="h6">
        Fetching adorable pets...
      </Typography>
    </Box>
  );
}
