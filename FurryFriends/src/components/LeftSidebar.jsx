// src/components/LeftSidebar.jsx
import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Collapse,
  Divider,
  ListItemIcon,
} from '@mui/material';
import { ExpandLess, ExpandMore, AddCircleOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PetsIcon from '@mui/icons-material/Pets';
import CreatePostDialog from '../components/CreatePostDialog';

const LeftSidebar = () => {
  const theme = useTheme();
  const [openPetTopics, setOpenPetTopics] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handlePetTopicsClick = () => {
    setOpenPetTopics((prev) => !prev);
  };

  return (
    <Box
      sx={{
        width: '240px',
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        overflowY: 'auto',
        height: '100%',
        color: theme.palette.text.primary,
      }}
    >
      <List>
        {/* Segment 1: General */}
        <ListSubheader>General</ListSubheader>
        <ListItemButton component={Link} to="/home">
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/popular">
          <ListItemIcon>
            <WhatshotIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Popular" />
        </ListItemButton>
        {/* Create Post Item */}
        <ListItemButton onClick={() => setOpenCreateDialog(true)}>
          <ListItemIcon>
            <AddCircleOutline fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Create Post" />
        </ListItemButton>
        <Divider />

        {/* Segment 2: Pet Topics */}
        <ListItemButton onClick={handlePetTopicsClick}>
          <ListItemIcon>
            <PetsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Pet Topics" />
          {openPetTopics ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openPetTopics} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton component={Link} to="/dogs" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Dogs" />
            </ListItemButton>
            <ListItemButton component={Link} to="/cats" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Cats" />
            </ListItemButton>
            <ListItemButton component={Link} to="/birds" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Birds" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />
        {/* Additional segments can be added here */}
      </List>
      <CreatePostDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </Box>
  );
};

export default LeftSidebar;
