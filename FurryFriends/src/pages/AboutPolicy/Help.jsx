import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import LeftSidebarDesktop from "../../components/LeftSidebarDesktop";
import LeftSidebar from "../../components/LeftSidebar";

// Import icons
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PetsIcon from "@mui/icons-material/Pets";
import SearchIcon from "@mui/icons-material/Search";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ReportIcon from "@mui/icons-material/Report";
import EmailIcon from "@mui/icons-material/Email";

const Help = ({ toggleTheme, darkMode }) => {
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
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />

      {/* Sidebar & Main Content */}
      <Box sx={{ display: "flex", flex: 1 }}>
        <LeftSidebarDesktop in={true} />
        <LeftSidebar />

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
              maxWidth: "600px",
              width: "100%",
              textAlign: "center",
              backgroundColor: darkMode ? "#1E1E1E" : "#fff",
              color: darkMode ? "#fff" : "#000",
              boxShadow: darkMode ? "0px 4px 10px rgba(255, 255, 255, 0.2)" : "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
              <HelpOutlineIcon fontSize="large" /> Help & Support
            </Typography>

            {/* Help Topics */}
            <List>
              {[
                { icon: <PetsIcon />, text: "How to create a post" },
                { icon: <SearchIcon />, text: "Finding lost pets" },
                { icon: <VerifiedUserIcon />, text: "Contacting veterinarians" },
                { icon: <ReportIcon />, text: "Reporting inappropriate content" },
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

            {/* Contact Support */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Need more help? Contact us at:
              </Typography>
              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                sx={{
                  backgroundColor: darkMode ? "#1976d2" : "#1E88E5",
                  color: "#fff",
                  "&:hover": { backgroundColor: darkMode ? "#1565C0" : "#1565C0" },
                }}
                href="mailto:support@furryfriends.com"
              >
                support@furryfriends.com
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Help;
