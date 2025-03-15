import React from "react";
import { Box, Typography, Paper, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Navbar from "../../components/Navbar";
import LeftSidebarDesktop from "../../components/LeftSidebarDesktop";
import LeftSidebar from "../../components/LeftSidebar";

// Import Icons
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PrivacyPolicy = ({ toggleTheme, darkMode }) => {
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
              <PrivacyTipIcon fontSize="large" /> Privacy Policy
            </Typography>

            {/* Privacy Points */}
            <List>
              {[
                { icon: <SecurityIcon />, text: "Your privacy is our priority." },
                { icon: <VerifiedUserIcon />, text: "We protect your personal data." },
                { icon: <VisibilityOffIcon />, text: "We do not share your data without consent." },
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
                  <ListItemIcon sx={{ color: darkMode ? "#90caf9" : "#1976d2" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>

            {/* Read More Button */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Read our full Privacy Policy:
              </Typography>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: darkMode ? "#1976d2" : "#1E88E5",
                  color: "#fff",
                  "&:hover": { backgroundColor: darkMode ? "#1565C0" : "#1565C0" },
                }}
                href="#"
              >
                Read More
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
