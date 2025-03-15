// src/components/VetMap.jsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import api from '../services/api'; // an axios instance with baseURL

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = {
  lat: 40.7128, // default center if user location not available
  lng: -74.0060,
};

const VetMap = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [vets, setVets] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);

  // 1) Get user's current position
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.error('Error fetching geolocation');
        }
      );
    }
  }, []);

  // 2) Fetch nearby vets from your backend
  useEffect(() => {
    const fetchVets = async () => {
      try {
        const response = await api.get('/vets/nearby', {
          params: {
            lat: currentPosition.lat,
            lng: currentPosition.lng,
          },
        });
        // The vet doc should have location.coordinates = [lng, lat]
        // We'll map them to .latitude, .longitude for the marker
        const vetsData = response.data.map((vet) => ({
          ...vet,
          latitude: vet.location.coordinates[1],
          longitude: vet.location.coordinates[0],
        }));
        setVets(vetsData);
      } catch (error) {
        console.error('Error fetching vets:', error);
      }
    };
    fetchVets();
  }, [currentPosition]);

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentPosition}
        zoom={12}
      >
        {/* Marker for User's Current Position */}
        <Marker
          position={currentPosition}
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          }}
        />

        {/* Markers for Vets */}
        {vets.map((vet) => (
          <Marker
            key={vet._id}
            position={{ lat: vet.latitude, lng: vet.longitude }}
            onClick={() => setSelectedVet(vet)}
          />
        ))}

        {/* InfoWindow for the selected Vet */}
        {selectedVet && (
          <InfoWindow
            position={{ lat: selectedVet.latitude, lng: selectedVet.longitude }}
            onCloseClick={() => setSelectedVet(null)}
          >
            <div>
              <h4>{selectedVet.name}</h4>
              <p>{selectedVet.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default VetMap;
