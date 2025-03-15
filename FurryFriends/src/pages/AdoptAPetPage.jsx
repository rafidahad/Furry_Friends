import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Navbar from "../components/Navbar";

const AdoptAPetPage = () => {
  const theme = useTheme();
  const [pets, setPets] = useState([]);

  // Assume current user info is stored in localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;

  // 1) Fetch adoption pets from backend
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/adoption", {
          headers: { Authorization: `Bearer ${token}` },
        });
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

  // 2) Handler: Mark as Adopted
  const handleMarkAsAdopted = async (petId) => {
    try {
      const token = localStorage.getItem("token");
      // Example PUT endpoint => /api/adoption/:id/status
      // Or use a single PUT route that updates the pet
      await axios.put(
        `http://localhost:5000/api/adoption/${petId}/status`,
        { status: "Adopted" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Re-fetch or update local state
      setPets((prev) =>
        prev.map((p) =>
          p._id === petId ? { ...p, status: "Adopted" } : p
        )
      );
    } catch (error) {
      console.error("Error marking as adopted:", error);
    }
  };

  // 3) Handler: Remove (delete) listing
  const handleRemoveListing = async (petId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/adoption/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove from local state
      setPets((prev) => prev.filter((p) => p._id !== petId));
    } catch (error) {
      console.error("Error deleting pet listing:", error);
    }
  };

  // 4) Handler: "Interested" => (In real life, might message the owner)
  const handleInterested = (pet) => {
    alert(`You are interested in adopting ${pet.name}!\n\nContact:\n• Email: ${pet.contactEmail}\n• Phone: ${pet.contactPhone}`);
    // Or open a message dialog, etc.
  };

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
                    Status: {pet.status}
                    <br />
                    Reason: {pet.reason}
                    <br />
                    Contact:
                    <br />• {pet.contactEmail}
                    <br />• {pet.contactPhone}
                  </Typography>
                </CardContent>

                {/* Action buttons */}
                <CardActions sx={{ justifyContent: "space-between" }}>
                  {/* If status is "Adopted", we can hide or disable the buttons: */}
                  {pet.status === "Adopted" ? (
                    <Typography variant="body2" color="error">
                      (Adopted)
                    </Typography>
                  ) : (
                    <>
                      {/* Show "Interested" if the current user is not the owner */}
                      {pet.createdBy?._id !== currentUserId ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleInterested(pet)}
                        >
                          Interested
                        </Button>
                      ) : (
                        // Otherwise show "Mark as Adopted" or "Remove"
                        <>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleMarkAsAdopted(pet._id)}
                          >
                            Mark as Adopted
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleRemoveListing(pet._id)}
                          >
                            Remove
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AdoptAPetPage;
