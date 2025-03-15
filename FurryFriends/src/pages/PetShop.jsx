import React, { useEffect, useState } from "react";
import { 
  Box, Typography, Card, CardContent, CircularProgress, 
  Button, Paper 
} from "@mui/material";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import Navbar from "../components/Navbar";
import LeftSidebarDesktop from "../components/LeftSidebarDesktop";
import LeftSidebar from "../components/LeftSidebar";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const PetShop = ({ toggleTheme, darkMode }) => {
  const [location, setLocation] = useState(null);
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
          fetchPetShops(userLocation);
        },
        (error) => {
          setError("Geolocation Error: Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  const fetchPetShops = async (userLocation) => {
    try {
      const response = await axios.post(
        `https://places.googleapis.com/v1/places:searchText`,
        {
          textQuery: "pet shop",
          locationBias: {
            circle: {
              center: {
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              },
              radius: 5000,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask": "places.displayName,places.location,places.rating,places.formattedAddress",
          },
        }
      );

      setShops(response.data.places || []);
    } catch (error) {
      setError("Error fetching pet shops. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: darkMode ? "#121212" : "#f9f9f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} darkMode={darkMode} />
      <Box sx={{ display: "flex", flex: 1 }}>
        <LeftSidebarDesktop in={true} />
        <LeftSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { xs: 0, md: "240px" }, maxWidth: "1200px", width: "100%" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>Nearest Pet Shops</Typography>
          {loading && <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}><CircularProgress /></Box>}
          {error && <Paper sx={{ p: 2, backgroundColor: "#ffcdd2", color: "#d32f2f", mt: 2 }}><Typography variant="body1">{error}</Typography></Paper>}
          {location && !loading && (
            <Card sx={{ mb: 2, backgroundColor: darkMode ? "#1E1E1E" : "#ffffff", color: darkMode ? "#ffffff" : "#000000" }}>
              <CardContent>
                <LoadScript googleMapsApiKey={API_KEY}>
                  <GoogleMap mapContainerStyle={mapContainerStyle} center={location} zoom={14}>
                    <Marker position={location} label="You" />
                    {shops.map((shop, index) => (
                      <Marker key={index} position={{ lat: shop.location.latitude, lng: shop.location.longitude }} onClick={() => setSelectedShop(shop)} />
                    ))}
                    {selectedShop && (
                      <InfoWindow position={{ lat: selectedShop.location.latitude, lng: selectedShop.location.longitude }} onCloseClick={() => setSelectedShop(null)}>
                        <Box sx={{ p: 1 }}>
                          <Typography variant="h6">{selectedShop.displayName.text}</Typography>
                          <Typography variant="body2">⭐ Rating: {selectedShop.rating || "N/A"}</Typography>
                          <Typography variant="body2">📍 {selectedShop.formattedAddress}</Typography>
                          <Button variant="contained" size="small" sx={{ mt: 1 }} href={`https://www.google.com/maps/search/?api=1&query=${selectedShop.location.latitude},${selectedShop.location.longitude}`} target="_blank" rel="noopener noreferrer">🗺 Get Directions</Button>
                        </Box>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              </CardContent>
            </Card>
          )}
          {shops.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Pet Shops Found:</Typography>
                {shops.map((shop, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: darkMode ? "#2C2C2C" : "#e3f2fd", color: darkMode ? "#ffffff" : "#000000" }}>
                    <Typography variant="h6">{shop.displayName.text}</Typography>
                    <Typography variant="body2">⭐ Rating: {shop.rating || "N/A"}</Typography>
                    <Typography variant="body2">📍 {shop.formattedAddress}</Typography>
                    <Button variant="contained" size="small" sx={{ mt: 1 }} href={`https://www.google.com/maps/search/?api=1&query=${shop.location.latitude},${shop.location.longitude}`} target="_blank" rel="noopener noreferrer">Get Directions</Button>
                  </Paper>
                ))}
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PetShop;
