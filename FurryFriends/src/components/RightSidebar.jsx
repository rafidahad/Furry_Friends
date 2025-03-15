// src/components/RightSidebar.jsx (Mobile Version)
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CreatePostDialog from './CreatePostDialog'; // Import the dialog

const RightSidebar = ({ onClose }) => {
  const theme = useTheme();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '64px',
        right: 0,
        width: '300px',
        height: 'calc(100vh - 64px)',
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
};

export default RightSidebar;
