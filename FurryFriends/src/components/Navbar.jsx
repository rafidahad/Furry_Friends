// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, InputBase, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Logout icon
import furryLogo from '../assets/furryFriends_header_logo.png';

const Navbar = ({ onMenuClick, toggleTheme, darkMode, showSearch = true }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement any logout logic here (e.g., clearing tokens)
    navigate("/"); // Redirect to home route
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left: Hamburger and Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMdUp && (
            <IconButton onClick={onMenuClick} sx={{ color: theme.palette.text.secondary, mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Box
            component="img"
            src={furryLogo}
            alt="Furry Friends Logo"
            sx={{ height: 60, width: 'auto', cursor: 'pointer' }}
            onClick={() => navigate("/")}
          />
        </Box>
        {/* Middle: Either the Search Bar or a Home link with icon */}
        {showSearch ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: darkMode ? theme.palette.grey[800] : '#f6f7f8',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              width: '40%',
            }}
          >
            <SearchIcon sx={{ color: theme.palette.text.secondary, mr: 1 }} />
            <InputBase
              placeholder="Search Furry Friends"
              inputProps={{ 'aria-label': 'search furry friends' }}
              sx={{ width: '100%', color: theme.palette.text.primary }}
            />
          </Box>
        ) : (
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate("/home")}
          >
            <HomeIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
              Home
            </Typography>
          </Box>
        )}
        {/* Right: Theme toggle, Account icon, and Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={toggleTheme} sx={{ color: theme.palette.text.secondary, mr: 2 }}>
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          {/* Navigate to myprofile when AccountCircle is clicked */}
          <IconButton
            sx={{ color: theme.palette.text.secondary, mr: 2 }}
            onClick={() => navigate("/myprofile")}
          >
            <AccountCircle />
          </IconButton>
          <IconButton onClick={handleLogout} sx={{ color: theme.palette.text.secondary }}>
            <ExitToAppIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
