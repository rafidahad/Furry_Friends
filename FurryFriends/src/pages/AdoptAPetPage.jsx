// src/pages/AdoptAPetPage.jsx
import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Navbar from '../components/Navbar';

const petData = [
  {
    id: 1,
    name: 'Buddy',
    age: '2 years',
    breed: 'Golden Retriever',
    type: 'Dog',
    image: 'https://via.placeholder.com/300x200?text=Buddy',
  },
  {
    id: 2,
    name: 'Luna',
    age: '1 year',
    breed: 'Siberian Husky',
    type: 'Dog',
    image: 'https://via.placeholder.com/300x200?text=Luna',
  },
  {
    id: 3,
    name: 'Max',
    age: '3 years',
    breed: 'Beagle',
    type: 'Dog',
    image: 'https://via.placeholder.com/300x200?text=Max',
  },
  {
    id: 4,
    name: 'Bella',
    age: '2.5 years',
    breed: 'Labrador',
    type: 'Dog',
    image: 'https://via.placeholder.com/300x200?text=Bella',
  },
  // Add more pets as needed...
];

const AdoptAPetPage = () => {
  const theme = useTheme();

  return (
    <>
      {/* Navbar with search hidden */}
      <Navbar showSearch={false} />

      {/* Main container using MUI Box for theme-based styling and offset */}
      <Box
        sx={{
          p: 4,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: '100vh',
          pt: '80px', // Adjust based on your Navbar's height
        }}
      >
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Adopt a Pet
        </Typography>
        <Typography variant="h6" align="center" gutterBottom sx={{ mb: 4 }}>
          Find your new best friend!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {petData.map((pet) => (
            <Grid item xs={12} sm={6} md={4} key={pet.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  m: 'auto',
                  boxShadow: 3,
                  transition: 'transform 0.3s',
                  position: 'relative',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={pet.image}
                  alt={pet.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    {pet.name}
                  </Typography>
                  {/* Display pet type below the name */}
                  <Typography variant="subtitle2" color="text.primary" sx={{ mb: 1 }}>
                    Type: {pet.type}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Age: {pet.age} <br />
                    Breed: {pet.breed}
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
