import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Navbar from "../../components/Navbar";
import LeftSidebarDesktop from "../../components/LeftSidebarDesktop";
import LeftSidebar from "../../components/LeftSidebar";

// Import Icons
import GavelIcon from "@mui/icons-material/Gavel";
import WarningIcon from "@mui/icons-material/Warning";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import RuleIcon from "@mui/icons-material/Rule";
import PetsIcon from "@mui/icons-material/Pets";

const Rules = ({ toggleTheme, darkMode }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        backgroundColor: darkMode ? "#121212" : "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} darkMode={darkMode} />

      {/* Sidebar & Main Content Layout */}
      <Box sx={{ display: "flex", flex: 1 }}>
        <LeftSidebarDesktop in={true} />
        <LeftSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            p: 3,
            ml: { xs: 0, md: "240px" },
          }}
        >
          <Paper
            sx={{
              p: 4,
              maxWidth: "650px",
              width: "100%",
              textAlign: "center",
              backgroundColor: darkMode ? "#1E1E1E" : "#fff",
              color: darkMode ? "#fff" : "#000",
              boxShadow: darkMode
                ? "0px 4px 10px rgba(255, 255, 255, 0.2)"
                : "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
            }}
          >
            {/* Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <RuleIcon fontSize="large" /> Community Rules
            </Typography>

            {/* General Rules */}
            <Typography variant="h6" sx={{ mb: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 1 }}>
              <GavelIcon /> General Rules:
            </Typography>
            <List>
              {[
                { icon: <WarningIcon />, text: "Be respectful to all users." },
                { icon: <ChatBubbleIcon />, text: "No hate speech, bullying, or harassment." },
                { icon: <DoNotDisturbAltIcon />, text: "No spamming or self-promotion." },
                { icon: <PetsIcon />, text: "Follow all pet adoption guidelines." },
              ].map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: darkMode ? "#2C2C2C" : "#f3f3f3",
                    borderRadius: "8px",
                    mb: 1,
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: darkMode ? "#383838" : "#e0e0e0",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: darkMode ? "#90caf9" : "#1976d2" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>

            {/* Posting Guidelines */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 1 }}>
              <ChatBubbleIcon /> Posting Guidelines:
            </Typography>
            <List>
              {[
                { icon: <PetsIcon />, text: "Keep discussions relevant to pets." },
                { icon: <WarningIcon />, text: "No misinformation about pet care." },
                { icon: <GavelIcon />, text: "Credit sources when sharing pet-related info." },
              ].map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: darkMode ? "#2C2C2C" : "#f3f3f3",
                    borderRadius: "8px",
                    mb: 1,
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: darkMode ? "#383838" : "#e0e0e0",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: darkMode ? "#90caf9" : "#1976d2" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>

            {/* Prohibited Content */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 1 }}>
              <DoNotDisturbAltIcon /> Prohibited Content:
            </Typography>
            <List>
              {[
                { icon: <WarningIcon />, text: "Animal abuse or cruelty-related content." },
                { icon: <PetsIcon />, text: "Selling pets without verified adoption procedures." },
                { icon: <DoNotDisturbAltIcon />, text: "Fake lost and found pet reports." },
              ].map((item, index) => (
                <ListItem
                  key={index}
                  sx={{
                    backgroundColor: darkMode ? "#2C2C2C" : "#f3f3f3",
                    borderRadius: "8px",
                    mb: 1,
                    transition: "all 0.3s",
                    "&:hover": {
                      backgroundColor: darkMode ? "#383838" : "#e0e0e0",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: darkMode ? "#90caf9" : "#1976d2" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Rules;
