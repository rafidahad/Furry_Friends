import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import Navbar from "../../components/Navbar";
import LeftSidebarDesktop from "../../components/LeftSidebarDesktop";
import LeftSidebar from "../../components/LeftSidebar";

// Import Icons
import GavelIcon from "@mui/icons-material/Gavel";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WarningIcon from "@mui/icons-material/Warning";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const UserAgreement = ({ toggleTheme, darkMode }) => {
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
              <GavelIcon fontSize="large" /> User Agreement
            </Typography>

            {/* Agreement Terms */}
            <Typography variant="h6" sx={{ mb: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 1 }}>
              <VerifiedUserIcon /> By using **Furry Friends**, you agree to:
            </Typography>

            <List>
              {[
                { icon: <VerifiedUserIcon />, text: "✅ Respect others in the community" },
                { icon: <VerifiedUserIcon />, text: "✅ Not post harmful or inappropriate content" },
                { icon: <VerifiedUserIcon />, text: "✅ Follow the platform’s pet adoption and safety policies" },
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

            {/* Consequences Section */}
            <Typography variant="h6" sx={{ mt: 3, mb: 2, textAlign: "left", display: "flex", alignItems: "center", gap: 1 }}>
              <WarningIcon /> Consequences of Violating This Agreement:
            </Typography>
            <List>
              {[
                { icon: <ReportProblemIcon />, text: "🚨 Account suspension or banning" },
                { icon: <ReportProblemIcon />, text: "🚨 Removal of violating content" },
                { icon: <ReportProblemIcon />, text: "🚨 Legal actions if necessary" },
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
                  <ListItemIcon sx={{ color: darkMode ? "#ff5252" : "#d32f2f" }}>{item.icon}</ListItemIcon>
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

export default UserAgreement;
