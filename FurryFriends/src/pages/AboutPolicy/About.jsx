import React from "react";
import { Box, Typography, Paper, Container, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import LeftSidebarDesktop from "../../components/LeftSidebarDesktop";
import LeftSidebar from "../../components/LeftSidebar";
import logo from "../../assets/furryFriends_header_logo.png";

const About = ({ toggleTheme, darkMode }) => {
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

        {/* Centered Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            p: 3,
            ml: { xs: 0, md: "240px" },
          }}
        >
          {/* Hero Section */}
          {/* Hero Section */}
<Box
  sx={{
    width: "100%",
    maxWidth: "900px",
    height: "300px",
    backgroundColor: darkMode ? "#1E1E1E" : "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "12px",
    boxShadow: darkMode
      ? "0 4px 10px rgba(255,255,255,0.2)"
      : "0 4px 10px rgba(0,0,0,0.2)",
    overflow: "hidden",
    p: 3,
  }}
>
  {/* Welcome Text */}
  <Typography
    variant="h3"
    sx={{
      fontWeight: "bold",
      color: darkMode ? "#fff" : "#000",
      textShadow: "2px 2px 5px rgba(0,0,0,0.3)",
    }}
  >
    Welcome to
  </Typography>

  {/* Logo Image */}
  <Box
    component="img"
    src={logo} // Make sure this path is correct!
    alt="Furry Friends Logo"
    sx={{
      width: "150px", // Adjust size accordingly
      mt: 2,
    }}
  />
</Box>


          {/* Content Section */}
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper
              sx={{
                p: 4,
                borderRadius: "12px",
                backgroundColor: darkMode ? "#1E1E1E" : "#fff",
                color: darkMode ? "#fff" : "#000",
                boxShadow: darkMode ? "0 4px 10px rgba(255,255,255,0.2)" : "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
                What is Furry Friends?
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                Welcome to <strong>Furry Friends</strong>, the ultimate **social network for pet lovers**! Our platform connects pet owners, 
                veterinarians, and animal enthusiasts worldwide to create a **supportive and loving community**.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.7 }}>
                Here, you can **share your pet’s stories, find lost pets, connect with vets, adopt a furry friend, and even shop for pet accessories!** 🐕🐱🐦
              </Typography>

              {/* Features Section */}
              <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: "center", backgroundColor: darkMode ? "#2C2C2C" : "#E3F2FD", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>🐶 Pet Community</Typography>
                    <Typography variant="body2">Join groups, chat with pet lovers, and share adorable pet moments.</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: "center", backgroundColor: darkMode ? "#2C2C2C" : "#E3F2FD", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>🏥 Find a Vet</Typography>
                    <Typography variant="body2">Locate the nearest veterinary clinics for your pet's healthcare needs.</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: "center", backgroundColor: darkMode ? "#2C2C2C" : "#E3F2FD", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>❤️ Adopt & Rescue</Typography>
                    <Typography variant="body2">Give a pet a loving home. Browse adoption listings and rescue pets in need.</Typography>
                  </Paper>
                </Grid>
              </Grid>

              {/* Call to Action */}
              <Typography
                variant="h5"
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  mt: 4,
                  p: 2,
                  borderRadius: "8px",
                  backgroundColor: darkMode ? "#FF7043" : "#FFCC80",
                  color: darkMode ? "#fff" : "#000",
                }}
              >
                🌎 Join Furry Friends and make the world a better place for pets! 🌎
              </Typography>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
