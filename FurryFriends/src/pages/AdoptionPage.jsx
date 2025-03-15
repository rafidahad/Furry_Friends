import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Navbar from "../components/Navbar";

import Adoption2 from "../Assets/adoptionMe.png";
import Adoption3 from "../Assets/adoption.png";

const AdoptionPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [pets, setPets] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    location: "",
    type: "Dog",
    reason: "",
    contactEmail: "",
    contactPhone: "",
    image: null,
  });

  // Fetch existing pets
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/adoption", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Our backend returns { success: true, pets: [...] }
        setPets(res.data.pets || []);
      } catch (error) {
        console.error("Error fetching adoption pets:", error);
      }
    };
    fetchPets();
  }, []);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  // Submit new pet
  const handleSubmitPet = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must log in first!");
        return;
      }
      const petData = new FormData();
      petData.append("name", formData.name);
      petData.append("age", formData.age);
      petData.append("location", formData.location);
      petData.append("type", formData.type);
      petData.append("reason", formData.reason);
      petData.append("contactEmail", formData.contactEmail);
      petData.append("contactPhone", formData.contactPhone);
      petData.append("image", formData.image);

      await axios.post("http://localhost:5000/api/adoption", petData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Pet submitted for adoption!");
      navigate("/home");
    } catch (err) {
      console.error("Error submitting pet:", err);
      alert("Failed to submit pet. Please try again.");
    }
  };

  return (
    <>
      <Navbar showSearch={false} />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          pt: "80px",
        }}
      >
        <div className="container py-5">
          <div className="row">
            {/* Left Column */}
            <div
              className="col-md-6 p-4 border rounded shadow"
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
              }}
            >
              <h2 className="text-primary fw-bold text-center">Adopt a Pet</h2>
              <div className="d-flex justify-content-center my-3">
                <img
                  src={Adoption2}
                  alt="Adopt a Pet"
                  className="img-fluid mx-2"
                  width="200"
                />
              </div>
              <p className="text-center">
                Welcome to our pet adoption program! 
                Adopting a pet brings joy and companionship into your life.
              </p>
              <h5 className="fw-bold text-primary">Available Pets</h5>
              {pets.length > 0 ? (
                <ul>
                  {pets.map((pet) => (
                    <li key={pet._id}>
                      {pet.name} - {pet.type} ({pet.age} years) - {pet.location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No pets available for adoption.</p>
              )}
              <div className="text-center">
                <button
                  className="btn btn-primary text-white"
                  onClick={() => navigate("/adopt_a_pet")}
                >
                  Find Your Perfect Pet
                </button>
              </div>
            </div>

            {/* Right Column */}
            <div
              className="col-md-6 p-4 border rounded shadow"
              style={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderColor: theme.palette.divider,
              }}
            >
              <h2 className="text-primary fw-bold text-center">
                Post a Pet for Adoption
              </h2>
              <div className="d-flex justify-content-center my-3">
                <img
                  src={Adoption3}
                  alt="Post a Pet"
                  className="img-fluid mx-2"
                  width="300"
                />
              </div>
              <form onSubmit={handleSubmitPet}>
                <div className="mb-3">
                  <label className="form-label">Pet Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pet Age:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="age"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Picture:</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Type:</label>
                  <select
                    className="form-select"
                    name="type"
                    onChange={handleChange}
                    required
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Fish">Fish</option>
                    <option value="Other">Others</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold text-primary">
                    Reason for Giving a Pet:
                  </label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="reason"
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <h5 className="text-primary fw-bold">Contact Information</h5>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="contactEmail"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactPhone"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary text-white">
                    Submit Your Pet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default AdoptionPage;
