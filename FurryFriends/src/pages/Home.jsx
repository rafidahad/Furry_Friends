// src/pages/Home.jsx
import React, { useState } from 'react';
import { Box, Drawer, useTheme, useMediaQuery } from '@mui/material';
import Navbar from '../components/Navbar';
import LeftSidebarDesktop from '../components/LeftSidebarDesktop';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebarDesktop from '../components/RightSidebarDesktop';
import Feed from '../components/Feed';

const Home = ({ toggleTheme, darkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Navbar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} darkMode={darkMode} />
      {isMdUp && <LeftSidebarDesktop in={isMdUp} />}
      {!isMdUp && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <LeftSidebar mobile />
        </Drawer>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '64px' }}>
        <Box
          component="main"
          sx={{
            flex: 1,
            marginLeft: { xs: 0, md: '240px' },
            padding: 2,
            maxWidth: '800px',
          }}
        >
          <Feed />
        </Box>
        {isLgUp && <RightSidebarDesktop in={isLgUp} />}
      </Box>
    </Box>
  );
};

export default Home;
