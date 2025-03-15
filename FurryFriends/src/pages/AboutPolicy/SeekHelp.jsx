import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import Navbar from "../../components/Navbar";
import LeftSidebarDesktop from "../../components/LeftSidebarDesktop";
import LeftSidebar from "../../components/LeftSidebar";

// Import Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PetsIcon from "@mui/icons-material/Pets";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import ForumIcon from "@mui/icons-material/Forum";

const SeekHelp = ({ toggleTheme, darkMode }) => {
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
              <ReportProblemIcon fontSize="large" /> Need Help? Contact Us!
            </Typography>

            {/* Contact Support */}
            <Typography variant="h6" sx={{ mb: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon /> Contact Support:
            </Typography>
            <List>
              {[
                { icon: <EmailIcon />, text: "Email: support@furryfriends.com" },
                { icon: <PhoneIcon />, text: "Phone: +1-800-123-4567" },
                { icon: <ChatIcon />, text: "Live Chat: Available 9 AM - 6 PM" },
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

            {/* Emergency Pet Help */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 1 }}>
              <LocalHospitalIcon /> Emergency Pet Help:
            </Typography>
            <List>
              {[
                { icon: <PetsIcon />, text: "Find a Vet", link: "/vet-locator" },
                { icon: <ReportProblemIcon />, text: "Report Lost Pets", link: "/lost-and-found" },
                { icon: <PetsIcon />, text: "Animal Shelters & Rescues", link: "/adoption" },
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
                  <ListItemText
                    primary={
                      <Button href={item.link} sx={{ textTransform: "none", color: darkMode ? "#90caf9" : "#1976d2" }}>
                        {item.text}
                      </Button>
                    }
                  />
                </ListItem>
              ))}
            </List>

            {/* Community Assistance */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 1 }}>
              <ForumIcon /> Community Assistance:
            </Typography>
            <List>
              {[
                { icon: <ForumIcon />, text: "Join our forums for pet advice." },
                { icon: <ReportProblemIcon />, text: "Report inappropriate content." },
                { icon: <PetsIcon />, text: "Share your experiences to help others." },
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

export default SeekHelp;
