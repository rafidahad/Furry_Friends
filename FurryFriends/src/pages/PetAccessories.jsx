import React, { useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, TextField } from "@mui/material";

const initialAccessories = [
  { id: 1, name: "Dog Collar", price: "৳500", image: "./dog_collar.jpg", description: "Durable and adjustable collar for dogs." },
  { id: 2, name: "Cat Scratching Post", price: "৳1200", image: "./cat_scratching.webp", description: "Perfect scratching post for your cat." },
  { id: 3, name: "Bird Feeder", price: "৳800", image: "./bird_feeder.jpg", description: "Easy-to-use bird feeder for your feathered friends." }
];

const PetAccessories = ({ isAdmin }) => {
  const [accessories, setAccessories] = useState(initialAccessories);
  const [newAccessory, setNewAccessory] = useState({ name: "", price: "", image: "", description: "" });

  const handleAddAccessory = () => {
    if (!newAccessory.name || !newAccessory.price || !newAccessory.image || !newAccessory.description) {
      alert("Please fill in all fields.");
      return;
    }
    setAccessories([...accessories, { ...newAccessory, id: accessories.length + 1 }]);
    setNewAccessory({ name: "", price: "", image: "", description: "" });
  };

  return (
    <Container style={{ padding: "20px", marginTop: "70px" }}>
      <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", color: "cornflowerblue" }}>
        Pet Accessories 🐾
      </Typography>
      
      {isAdmin && (
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <TextField label="Accessory Name" value={newAccessory.name} onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })} style={{ marginRight: "10px" }} />
          <TextField label="Price" value={newAccessory.price} onChange={(e) => setNewAccessory({ ...newAccessory, price: e.target.value })} style={{ marginRight: "10px" }} />
          <TextField label="Image URL" value={newAccessory.image} onChange={(e) => setNewAccessory({ ...newAccessory, image: e.target.value })} style={{ marginRight: "10px" }} />
          <TextField label="Description" value={newAccessory.description} onChange={(e) => setNewAccessory({ ...newAccessory, description: e.target.value })} style={{ marginRight: "10px" }} />
          <Button variant="contained" color="primary" onClick={handleAddAccessory}>Add Accessory</Button>
        </div>
      )}
       
      <Grid container spacing={4} justifyContent="center">
        {accessories.map((accessory) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={accessory.id}>
            <Card>
              <CardMedia component="img" height="200" image={accessory.image} alt={accessory.name} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">{accessory.name}</Typography>
                <Typography variant="body2" color="textSecondary">{accessory.description}</Typography>
                <Typography variant="h6" color="primary">{accessory.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="secondary" style={{ display: "block", margin: "0 auto 20px" }}>Add Accessory</Button>
    </Container>
  );
};

export default PetAccessories;
