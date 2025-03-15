// src/components/RightSidebarDesktop.jsx (Desktop Version)
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import CreatePostDialog from './CreatePostDialog'; // Import the dialog

const RightSidebarDesktop = ({ in: inProp }) => {
  const theme = useTheme();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const sidebarContent = (
    <Box
      sx={{
        position: 'fixed',
        top: '64px', // adjust according to your Navbar height
        right: 0,
        width: '300px',
        height: 'calc(100% - 64px)',
        backgroundColor: theme.palette.background.paper,
        borderLeft: `1px solid ${theme.palette.divider}`,
        overflowY: 'auto',
        p: 2,
        color: theme.palette.text.primary,
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Create a Post
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>
            Share your pet stories, pictures, or questions!
          </Typography>
          <Button variant="contained" size="small" onClick={handleOpenCreateDialog}>
            Create Post
          </Button>
        </CardContent>
      </Card>
      {/* Render CreatePostDialog */}
      <CreatePostDialog open={openCreateDialog} onClose={handleCloseCreateDialog} />
    </Box>
  );

  return (
    <Slide direction="left" in={inProp} mountOnEnter unmountOnExit timeout={300}>
      <Box sx={{ position: 'fixed', top: '64px', right: 0, zIndex: 1200 }}>
        {sidebarContent}
      </Box>
    </Slide>
  );
};

export default RightSidebarDesktop;
