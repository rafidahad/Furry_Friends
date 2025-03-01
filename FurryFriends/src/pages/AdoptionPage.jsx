// src/pages/AdoptionPage.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Navbar from "../components/Navbar"; // Your updated MUI Navbar

import Adoption2 from "../Assets/adoptionMe.png";
import Adoption3 from "../Assets/adoption.png";

const AdoptionPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();    // Access MUI theme (for dark mode)
  const [selectedOption, setSelectedOption] = useState(null);

  // Updated: Navigate to "/adopt_a_pet" when the button is clicked.
  const handleFindPetClick = () => {
    navigate("/adopt_a_pet");
  };

  const handleSubmitPetClick = () => {
    navigate("/home");
  };

  return (
    <>
      {/* Navbar: search bar hidden */}
      <Navbar showSearch={false} />

      {/* MUI Box to apply theme's background & text color */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          pt: "80px", // Offset for fixed navbar (adjust as needed)
        }}
      >
        <div className="container py-5">
          <div className="row">
            {/* Left Column: Adopt a Pet */}
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
                Welcome to our pet adoption program! Adopting a pet brings joy
                and companionship into your life.
              </p>
              <h5 className="fw-bold text-primary">Benefits of Pet Adoption</h5>
              <ul>
                <li>Provide a loving home to a pet in need</li>
                <li>Experience unconditional love</li>
                <li>Create lasting memories</li>
              </ul>
              <h5 className="fw-bold text-primary">Adoption Process</h5>
              <ul>
                <li>Fill out an adoption application</li>
                <li>Meet potential pets in person</li>
                <li>Complete necessary paperwork</li>
              </ul>
              <h5 className="fw-bold text-primary">Responsibilities</h5>
              <p>
                Adopting a pet comes with responsibilities, including feeding,
                grooming, regular exercise, and medical care.
              </p>
              <div className="text-center">
                <button
                  className="btn btn-primary text-white"
                  onClick={handleFindPetClick}
                >
                  Find Your Perfect Pet
                </button>
              </div>
            </div>

            {/* Right Column: Post a Pet for Adoption */}
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
              <form>
                <div className="mb-3">
                  <label className="form-label">Pet Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter pet's name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Pet Age:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter pet's age"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Picture:</label>
                  <input type="file" className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Location:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter location"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Type:</label>
                  <select className="form-select">
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
                    placeholder="Explain why you are giving this pet for adoption"
                  ></textarea>
                </div>

                <h5 className="text-primary fw-bold">Contact Information</h5>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number:</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary text-white"
                    onClick={handleSubmitPetClick}
                  >
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
