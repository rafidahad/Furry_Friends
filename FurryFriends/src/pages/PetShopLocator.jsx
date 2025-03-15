// src/pages/PetShopLocator.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Button,
  Drawer,
} from "@mui/material";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import axios from "axios";
import Navbar from "../components/Navbar";
import LeftSidebarDesktop from "../components/LeftSidebarDesktop";
import LeftSidebar from "../components/LeftSidebar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const PetShopLocator = ({ toggleTheme, darkMode }) => {
  const [location, setLocation] = useState(null); // user’s lat/lng
  const [petShops, setPetShops] = useState([]);  // array of place objects from Google
  const [selectedShop, setSelectedShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // For drawer logic
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // for responsive detection
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // your env variable:
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // 1) Get user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLoc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setLocation(userLoc);
          fetchPetShops(userLoc);
        },
        (err) => {
          setError("Please allow location access to see nearby pet shops.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  }, []);

  // 2) Fetch the “pet shops” from Google Places
  const fetchPetShops = async (userLoc) => {
    try {
      const { lat, lng } = userLoc;
      const response = await axios.post(
        "https://places.googleapis.com/v1/places:searchText",
        {
          textQuery: "pet shops",
          locationBias: {
            circle: {
              center: { latitude: lat, longitude: lng },
              radius: 5000, // 5km
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": API_KEY,
            "X-Goog-FieldMask":
              "places.displayName,places.location,places.rating,places.formattedAddress",
          },
        }
      );
      const shops = response.data.places || [];
      setPetShops(shops);
    } catch (err) {
      console.error("Error fetching pet shops from Google Places:", err);
      setError("Failed to fetch pet shops. See console.");
    } finally {
      setLoading(false);
    }
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
      <Navbar
        onMenuClick={handleDrawerToggle}
        toggleTheme={toggleTheme}
        darkMode={darkMode}
      />

      {/* Desktop sidebar if mdUp */}
      {isMdUp && <LeftSidebarDesktop in={isMdUp} />}

      {/* Mobile drawer for sidebar */}
      <Drawer
        anchor="left"
        open={!isMdUp && mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        <LeftSidebar mobile />
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flex: 1,
          ml: { xs: 0, md: "240px" }, // space for the desktop sidebar
          p: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Nearest Pet Shops
        </Typography>

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Paper
            sx={{
              p: 2,
              backgroundColor: "#ffcdd2",
              color: "#d32f2f",
              mt: 2,
            }}
          >
            <Typography variant="body1">{error}</Typography>
          </Paper>
        )}

        {/* The Map */}
        {!loading && location && (
          <Card
            sx={{
              mb: 2,
              backgroundColor: darkMode ? "#1E1E1E" : "#ffffff",
            }}
          >
            <CardContent>
              <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={location}
                  zoom={14}
                >
                  {/* Marker for user's location */}
                  <Marker
                    position={location}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                    }}
                  />
                  {/* Markers for pet shops */}
                  {petShops.map((shop, idx) => {
                    if (!shop.location?.latitude || !shop.location?.longitude) {
                      return null;
                    }
                    return (
                      <Marker
                        key={idx}
                        position={{
                          lat: shop.location.latitude,
                          lng: shop.location.longitude,
                        }}
                        onClick={() => setSelectedShop(shop)}
                      />
                    );
                  })}
                  {/* InfoWindow for a selected shop */}
                  {selectedShop && (
                    <InfoWindow
                      position={{
                        lat: selectedShop.location.latitude,
                        lng: selectedShop.location.longitude,
                      }}
                      onCloseClick={() => setSelectedShop(null)}
                    >
                      <Box sx={{ p: 1 }}>
                        <Typography variant="h6">
                          {selectedShop.displayName?.text || "Pet Shop"}
                        </Typography>
                        {selectedShop.rating && (
                          <Typography variant="body2">
                            ⭐ Rating: {selectedShop.rating}
                          </Typography>
                        )}
                        <Typography variant="body2">
                          {selectedShop.formattedAddress}
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{ mt: 1 }}
                          href={`https://www.google.com/maps/search/?api=1&query=${selectedShop.location.latitude},${selectedShop.location.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Get Directions
                        </Button>
                      </Box>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </LoadScript>
            </CardContent>
          </Card>
        )}

        {/* List them below the map */}
        {!loading && petShops.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Pet Shops Found:
              </Typography>
              {petShops.map((shop, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: darkMode ? "#2C2C2C" : "#e3f2fd",
                  }}
                >
                  <Typography variant="h6">
                    {shop.displayName?.text || "Pet Shop"}
                  </Typography>
                  {shop.rating && (
                    <Typography variant="body2">
                      ⭐ Rating: {shop.rating}
                    </Typography>
                  )}
                  <Typography variant="body2">
                    {shop.formattedAddress}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                    href={`https://www.google.com/maps/search/?api=1&query=${shop.location.latitude},${shop.location.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Directions
                  </Button>
                </Paper>
              ))}
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default PetShopLocator;
