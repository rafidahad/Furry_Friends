// LeftSidebar.jsx (Mobile Version)
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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Import icons (feel free to adjust which icon is used for each item)
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import PetsIcon from '@mui/icons-material/Pets';
import GroupIcon from '@mui/icons-material/Group';
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

const LeftSidebar = () => {
  const theme = useTheme();
  const [openPetTopics, setOpenPetTopics] = useState(true);

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
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <WhatshotIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Popular" />
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
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Dogs" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Cats" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PetsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Birds" />
            </ListItemButton>
          </List>
        </Collapse>
        <Divider />

        {/* Segment 3: Services */}
        <ListSubheader>Services</ListSubheader>
        <ListItemButton>
          <ListItemIcon>
            <FavoriteBorderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Adoption" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SearchOffIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Lost and Found" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LocalHospitalIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Nearest Vet" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <StoreIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Pet Shops" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Pet Accessories" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Communities" />
        </ListItemButton>
        <Divider />

        {/* Segment 4: About & Policy */}
        <ListSubheader>About &amp; Policy</ListSubheader>
        <ListItemButton>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="About Furry Friends" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <HelpOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Help" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DescriptionIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="User Agreement" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <GavelIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Furry Friends Rules" />
        </ListItemButton>
        <Divider />

        {/* Segment 5: Additional */}
        <ListItemButton>
          <ListItemIcon>
            <SupportAgentIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Seek Help" />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default LeftSidebar;
