// src/pages/Popular.jsx
import React, { useState } from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import LeftSidebarDesktop from '../components/LeftSidebarDesktop';
import LeftSidebar from '../components/LeftSidebar'; // Mobile version of left sidebar
import RightSidebarDesktop from '../components/RightSidebarDesktop';
import Feed from '../components/Feed';

const Popular = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  // Breakpoints for responsive rendering
  const isMdUp = useMediaQuery(theme.breakpoints.up('md')); // For desktop left sidebar
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg')); // For desktop right sidebar

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Navbar with onMenuClick; no theme toggle props passed */}
      <Navbar onMenuClick={handleDrawerToggle} />
      
      {/* Desktop Left Sidebar */}
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

        {/* Desktop Right Sidebar */}
        {isLgUp && <RightSidebarDesktop in={isLgUp} />}
      </Box>
    </Box>
  );
};

export default Popular;
