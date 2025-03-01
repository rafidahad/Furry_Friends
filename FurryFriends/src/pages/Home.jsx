// src/pages/Home.jsx
import React, { useState } from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import LeftSidebarDesktop from '../components/LeftSidebarDesktop';
import LeftSidebar from '../components/LeftSidebar'; // Mobile version of left sidebar
import RightSidebarDesktop from '../components/RightSidebarDesktop';
import Feed from '../components/Feed';

const Home = ({ toggleTheme, darkMode }) => {
  // State for mobile drawer open/close
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  // Breakpoints for responsive rendering
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // For desktop left sidebar
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg')); // For desktop right sidebar

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Navbar receives the theme toggle props and menu toggle for mobile */}
      <Navbar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} darkMode={darkMode} />

      {/* Desktop Left Sidebar with slide animation */}
      {isMdUp && <LeftSidebarDesktop in={isMdUp} />}

      {/* Mobile Left Sidebar in a Drawer */}
      {!isMdUp && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Improves mobile performance
        >
          <LeftSidebar mobile />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '64px' }}>
        <Box
          component="main"
          sx={{
            flex: 1,
            marginLeft: { xs: 0, md: '240px' }, // Reserve space for left sidebar on desktop
            padding: 2,
            maxWidth: '800px',
          }}
        >
          <Feed />
        </Box>

        {/* Desktop Right Sidebar with slide animation */}
        {isLgUp && <RightSidebarDesktop in={isLgUp} />}
      </Box>
    </Box>
  );
};

export default Home;
