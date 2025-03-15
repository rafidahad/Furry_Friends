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

const VetLocator = ({ toggleTheme, darkMode }) => {
  const [location, setLocation] = useState(null);
  const [vets, setVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
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
          fetchVetClinics(userLocation);
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

  const fetchVetClinics = async (userLocation) => {
    try {
      const response = await axios.post(
        `https://places.googleapis.com/v1/places:searchText`,
        {
          textQuery: "veterinary clinic",
          locationBias: {
            circle: {
              center: {
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              },
              radius: 5000, // Search within 5km radius
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

      console.log("Fetched Vet Clinics:", response.data.places);
      
      // Ensure valid latitude/longitude before rendering markers
      const validVets = response.data.places.filter(vet => vet.location?.latitude && vet.location?.longitude);
      console.log("Valid Vet Locations:", validVets);
      
      setVets(validVets);
    } catch (error) {
      console.error("Vet Clinics Fetch Error:", error);
      setError("Error fetching vet clinics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: darkMode ? "#121212" : "#f9f9f9", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} darkMode={darkMode} />

      {/* Layout with Sidebar & Main Content */}
      <Box sx={{ display: "flex", flex: 1 }}>
        <LeftSidebarDesktop in={true} />
        <LeftSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { xs: 0, md: "240px" }, maxWidth: "1200px", width: "100%" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Nearest Vet Clinics
          </Typography>

          {/* Show loading indicator */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Show error message */}
          {error && (
            <Paper sx={{ p: 2, backgroundColor: "#ffcdd2", color: "#d32f2f", mt: 2 }}>
              <Typography variant="body1">{error}</Typography>
            </Paper>
          )}

          {/* Google Map */}
          {location && !loading && (
            <Card sx={{ mb: 2, backgroundColor: darkMode ? "#1E1E1E" : "#ffffff", color: darkMode ? "#ffffff" : "#000000" }}>
              <CardContent>
                <LoadScript googleMapsApiKey={API_KEY} libraries={["places"]}>
                  <GoogleMap 
                    mapContainerStyle={mapContainerStyle} 
                    center={location} 
                    zoom={14}
                  >
                    {/* 🔵 User's Location */}
                    <Marker position={location} label="You" />

                    {/* 🏥 Display Vet Clinics */}
                    {vets.map((vet, index) => {
                      console.log(`Adding marker: ${vet.displayName.text} at (${vet.location.latitude}, ${vet.location.longitude})`);
                      return (
                        <Marker
                          key={index}
                          position={{
                            lat: vet.location.latitude,
                            lng: vet.location.longitude,
                          }}
                          onClick={() => setSelectedVet(vet)}
                        />
                      );
                    })}

                    {/* 🏥 Show Vet Info when marker is clicked */}
                    {selectedVet && (
                      <InfoWindow
                        position={{
                          lat: selectedVet.location.latitude,
                          lng: selectedVet.location.longitude,
                        }}
                        onCloseClick={() => setSelectedVet(null)}
                      >
                        <Box sx={{ p: 1 }}>
                          <Typography variant="h6">{selectedVet.displayName.text}</Typography>
                          <Typography variant="body2">⭐ Rating: {selectedVet.rating || "N/A"}</Typography>
                          <Typography variant="body2">📍 {selectedVet.formattedAddress}</Typography>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ mt: 1 }}
                            href={`https://www.google.com/maps/search/?api=1&query=${selectedVet.location.latitude},${selectedVet.location.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            🗺 Get Directions
                          </Button>
                        </Box>
                      </InfoWindow>
                    )}
                  </GoogleMap>
                </LoadScript>
              </CardContent>
            </Card>
          )}

          {/* List of Vet Clinics */}
          {vets.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Veterinary Clinics Found:
                </Typography>
                {vets.map((vet, index) => (
                  <Paper key={index} sx={{ p: 2,mb:2, 
                    backgroundColor: darkMode ? "#2C2C2C" : "#e3f2fd", 
                    color: darkMode ? "#ffffff" : "#000000" }}>
                    <Typography variant="h6">{vet.displayName.text}</Typography>
                    <Typography variant="body2">⭐ Rating: {vet.rating || "N/A"}</Typography>
                    <Typography variant="body2">📍 {vet.formattedAddress}</Typography>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mt: 1 }}
                      href={`https://www.google.com/maps/search/?api=1&query=${vet.location.latitude},${vet.location.longitude}`}
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
    </Box>
  );
};

export default VetLocator;
