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
  const [showForm, setShowForm] = useState(false);

  const handleAddAccessory = async () => {
    if (!isAdmin) {
      alert("Warning! Only Admins can post products for sale");
      return;
    }

    if (!newAccessory.name || !newAccessory.price || !newAccessory.image || !newAccessory.description) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAccessory.name,
          price: parseFloat(newAccessory.price.replace(/[^\d.]/g, "")), // Convert price to number
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to SSLCommerz payment page
      } else {
        alert("Payment initiation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }

    setNewAccessory({ name: "", price: "", image: "", description: "" });
    setShowForm(false);
  };

  return (
    <Container style={{ padding: "20px", marginTop: "70px" }}>
      <Typography variant="h4" style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold", color: "cornflowerblue" }}>
        Pet Accessories 🐾
      </Typography>

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

      {/* Add Accessory Button at the Bottom */}
      <Button 
        variant="contained" 
        color="secondary" 
        style={{ display: "block", margin: "20px auto" }} 
        onClick={() => setShowForm(true)}
      >
        Add Accessory
      </Button>

      {/* Form for Admins to Add Accessories */}
      {showForm && isAdmin && (
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <TextField label="Accessory Name" value={newAccessory.name} onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })} style={{ marginRight: "10px" }} />
          <TextField label="Price" value={newAccessory.price} onChange={(e) => setNewAccessory({ ...newAccessory, price: e.target.value })} style={{ marginRight: "10px" }} />
          <TextField label="Image URL" value={newAccessory.image} onChange={(e) => setNewAccessory({ ...newAccessory, image: e.target.value })} style={{ marginRight: "10px" }} />
          <TextField label="Description" value={newAccessory.description} onChange={(e) => setNewAccessory({ ...newAccessory, description: e.target.value })} style={{ marginRight: "10px" }} />
          <Button variant="contained" color="primary" onClick={handleAddAccessory}>Submit Product</Button>
        </div>
      )}
    </Container>
  );
};

export default PetAccessories;
