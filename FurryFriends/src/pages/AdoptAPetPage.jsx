import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../components/Navbar";
import axios from "axios";

const AdoptAPetPage = () => {
  const theme = useTheme();
  const [pets, setPets] = useState([]); // This will hold the fetched pet data

  // Fetch adoption pets from the backend
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token");
        // NOTE: Adjust the URL to your server's address/endpoint
        const res = await axios.get("http://localhost:5000/api/adoption", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // The backend might return something like:
        // { success: true, pets: [...petObjects...] }
        // So we read res.data.pets if res.data.success is true
        if (res.data && res.data.success && Array.isArray(res.data.pets)) {
          setPets(res.data.pets);
        } else {
          console.error("Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("Error fetching adoption pets:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <>
      {/* Navbar with search hidden */}
      <Navbar showSearch={false} />

      <Box
        sx={{
          p: 4,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: "100vh",
          pt: "80px", // Adjust based on your Navbar's height
        }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
          Adopt a Pet
        </Typography>
        <Typography variant="h6" align="center" gutterBottom sx={{ mb: 4 }}>
          Find your new best friend!
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {pets.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet._id}>
              <Card
                sx={{
                  maxWidth: 345,
                  m: "auto",
                  boxShadow: 3,
                  transition: "transform 0.3s",
                  position: "relative",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {/* 
                  If your backend stores a direct Cloudinary image URL in pet.image, 
                  use that directly. Otherwise, you can fall back to a placeholder. 
                */}
                <CardMedia
                  component="img"
                  height="200"
                  image={pet.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={pet.name || "Adoption Pet"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                    {pet.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
                    Type: {pet.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {pet.age}
                    <br />
                    Location: {pet.location}
                    <br />
                    {/* If you stored any additional fields like breed, reason, etc. */}
                    Reason: {pet.reason}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AdoptAPetPage;
