// src/pages/MyProfile.jsx
import React, { useState } from 'react';
import { Box, Drawer, Avatar, Button, Typography, Card, CardContent, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


import Navbar from '../components/Navbar';
import LeftSidebarDesktop from '../components/LeftSidebarDesktop';
import LeftSidebar from '../components/LeftSidebar';

const MyProfile = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const theme = useTheme();

  // For desktop vs. mobile sidebars
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCreatePost = () => {
    // Implement your create-post logic here (e.g. API call)
    if (postContent.trim()) {
      console.log('Post created:', postContent);
      setPostContent('');
    }
  };

  // Example user data (replace with real data)
  const userData = {
    username: 'u/your_username',
    avatar: 'https://via.placeholder.com/100.png?text=My+Avatar',
    followers: 12,
    posts: 5,
    communities: ['r/Dogs', 'r/Cats', 'r/Birds'],
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Navbar with search bar visible */}
      <Navbar onMenuClick={handleDrawerToggle} showSearch={true} />

      {/* Desktop Left Sidebar */}
      {isMdUp && <LeftSidebarDesktop in={isMdUp} />}

      {/* Mobile Drawer for Left Sidebar */}
      {!isMdUp && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <LeftSidebar />
        </Drawer>
      )}

      {/* Main Content Area */}
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '64px' }}>
        <Box
          component="main"
          sx={{
            flex: 1,
            marginLeft: { xs: 0, md: '240px' },
            p: 2,
            maxWidth: '800px',
          }}
        >
          {/* User Info Card */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  alt="My Avatar"
                  src={userData.avatar}
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {userData.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Welcome back!
                  </Typography>
                </Box>
              </Box>

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Followers
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {userData.followers}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Posts
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {userData.posts}
                  </Typography>
                </Box>
              </Box>

              {/* List of communities */}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                My Communities
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {userData.communities.map((comm) => (
                  <Box
                    key={comm}
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      px: 2,
                      py: 0.5,
                    }}
                  >
                    <Typography variant="body2">{comm}</Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Create Post Card */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Create a Post
              </Typography>
              <TextField
                multiline
                rows={3}
                fullWidth
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                onClick={handleCreatePost}
                disabled={!postContent.trim()}
              >
                Post
              </Button>
            </CardContent>
          </Card>

          {/* Placeholder for user’s own posts */}
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                You have {userData.posts} posts. (Display them here or show a placeholder if none.)
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
