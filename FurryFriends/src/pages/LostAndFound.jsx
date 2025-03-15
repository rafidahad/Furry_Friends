import React from 'react';
import { Box, Typography } from '@mui/material';
import LeftSidebarDesktop from '../components/LeftSidebarDesktop';
import RightSidebarDesktop from '../components/RightSidebarDesktop';
import Navbar from '../components/Navbar';

const LostAndFound = () => {
  return (
    <Box>
      {/* Navbar */}
      <Navbar />
      
      {/* Main Layout */}
      <Box sx={{ display: 'flex', mt: '64px' }}>
        {/* Left Sidebar */}
        <LeftSidebarDesktop in={true} />
        
        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4">Lost and Found</Typography>
          <Typography variant="body1">
            Find lost pets or report a missing one.
          </Typography>
        </Box>
        
        {/* Right Sidebar */}
        <RightSidebarDesktop in={true} />
      </Box>
    </Box>
  );
};

export default LostAndFound;
