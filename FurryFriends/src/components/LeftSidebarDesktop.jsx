// src/components/LeftSidebarDesktop.jsx
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
import { Link } from 'react-router-dom'; // Import Link for routing
import { useTheme } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { ExpandLess, ExpandMore, AddCircleOutline } from '@mui/icons-material';

// Import icons
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LockIcon from '@mui/icons-material/Lock';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import CreatePostDialog from '../components/CreatePostDialog';

const LeftSidebarDesktop = ({ in: inProp }) => {
  const theme = useTheme();
  const [openPetTopics, setOpenPetTopics] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handlePetTopicsClick = () => {
    setOpenPetTopics((prev) => !prev);
  };

  const sidebarContent = (
    <Box
      sx={{
        width: '240px',
        height: 'calc(100vh - 64px)', // assuming Navbar height = 64px
        backgroundColor: theme.palette.background.paper,
        borderRight: `1px solid ${theme.palette.divider}`,
        overflowY: 'auto',
        color: theme.palette.text.primary,
        '&::-webkit-scrollbar': { width: '0px' },
        '&:hover::-webkit-scrollbar': { width: '8px' },
        '&:hover::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
          borderRadius: '4px',
        },
        scrollbarWidth: 'none',
        '&:hover': { scrollbarWidth: 'auto' },
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
            <ListItemButton component={Link} to="/rabbits" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Rabbits" />
            </ListItemButton>
            <ListItemButton component={Link} to="/hamsters" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Hamsters" />
            </ListItemButton>
            <ListItemButton component={Link} to="/guinea-pigs" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Guinea Pigs" />
            </ListItemButton>
            <ListItemButton component={Link} to="/reptiles" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Reptiles" />
            </ListItemButton>
            <ListItemButton component={Link} to="/ferrets" sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Ferrets" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />

        {/* Segment 3: Services */}
        <ListSubheader>Services</ListSubheader>
        <ListItemButton component={Link} to="/adoption">
          <ListItemIcon>
            <FavoriteBorderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Adoption" />
        </ListItemButton>
        <ListItemButton component={Link} to="/lost-and-found">
          <ListItemIcon>
            <SearchOffIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Lost and Found" />
        </ListItemButton>
        
<ListItemButton component={Link} to="/vet-locator">
  <ListItemIcon>
    <LocalHospitalIcon fontSize="small" />
  </ListItemIcon>
  <ListItemText primary="Nearest Vet" />
</ListItemButton>

        <ListItemButton component={Link} to="/pet-shop-locator">
          <ListItemIcon>
            <StoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Pet Shops" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pet-accessories">
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Pet Accessories" />
        </ListItemButton>
        <ListItemButton component={Link} to="/communities">
          <ListItemIcon>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Communities" />
        </ListItemButton>
        <Divider />

        {/* Segment 4: About & Policy */}
        <ListSubheader>About & Policy</ListSubheader>
        <ListItemButton component={Link} to="/about">
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="About Furry Friends" />
        </ListItemButton>
        <ListItemButton component={Link} to="/help">
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItemButton>
        <ListItemButton component={Link} to="/privacy-policy">
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItemButton>
        <ListItemButton component={Link} to="/user-agreement">
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="User Agreement" />
        </ListItemButton>
        <ListItemButton component={Link} to="/rules">
          <ListItemIcon>
            <GavelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Furry Friends Rules" />
        </ListItemButton>
        <Divider />

        {/* Segment 5: Additional */}
        <ListItemButton component={Link} to="/seek-help">
          <ListItemIcon>
            <SupportAgentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Seek Help" />
        </ListItemButton>
      </List>
      <CreatePostDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
      />
    </Box>
  );

  return (
    <Slide direction="right" in={inProp} mountOnEnter unmountOnExit timeout={300}>
      <Box sx={{ position: 'fixed', top: '64px', left: 0, zIndex: 1200 }}>
        {sidebarContent}
      </Box>
    </Slide>
  );
};

export default LeftSidebarDesktop;
