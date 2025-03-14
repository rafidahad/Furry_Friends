import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Link as MuiLink,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ Import API
import "./LoginSignUp.css";
import furryLogo from "../assets/furryFriends_header_logo.png";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    surname: "",
    day: "1",
    month: "Jan",
    year: "2000",
    gender: "Female",
    email: "",
    password: "",
    bio: "",
    profilePicture: null,
  });

  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * ✅ Upload Profile Picture to Cloudinary
   */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("file", file);

    setUploading(true);

    try {
      const response = await api.post("/upload/profile-picture", imageData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData((prev) => ({
        ...prev,
        profilePicture: response.data.url,
      }));
    } catch (error) {
      console.error("Profile picture upload failed:", error);
      alert("Failed to upload profile picture.");
    } finally {
      setUploading(false);
    }
  };

  /**
   * ✅ Handle Signup Submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const userData = {
      username: formData.username,
      firstName: formData.firstName,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      bio: formData.bio,
      profilePicture: formData.profilePicture,
      gender: formData.gender,
      dob: {
        day: formData.day,
        month: formData.month,
        year: formData.year,
      },
    };
  
    try {
      const response = await api.post("/auth/signup", userData);
      localStorage.setItem("token", response.data.token);
      navigate("/otp", { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <Box className="login-wrapper">
      <div className="signup-header">
        <img src={furryLogo} alt="Website Logo" />
        <Typography className="header-title">Create a new account</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          It’s quick and easy.
        </Typography>
      </div>

      <Card>
        <CardContent>
          {error && (
            <Typography color="error" align="center" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField name="username" label="Username" fullWidth value={formData.username} onChange={handleChange} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField name="firstName" label="First name" fullWidth value={formData.firstName} onChange={handleChange} />
              <TextField name="surname" label="Surname" fullWidth value={formData.surname} onChange={handleChange} />
            </Box>

            <Box className="dob-container">
              <FormControl size="small">
                <InputLabel>Day</InputLabel>
                <Select name="day" value={formData.day} onChange={handleChange}>
                  {[...Array(31)].map((_, i) => (
                    <MenuItem key={i} value={String(i + 1)}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small">
                <InputLabel>Month</InputLabel>
                <Select name="month" value={formData.month} onChange={handleChange}>
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small">
                <InputLabel>Year</InputLabel>
                <Select name="year" value={formData.year} onChange={handleChange}>
                  {Array.from({ length: 70 }, (_, i) => 2025 - i).map((y) => (
                    <MenuItem key={y} value={String(y)}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <RadioGroup row name="gender" value={formData.gender} onChange={handleChange} sx={{ justifyContent: "space-between", mb: 2 }}>
              <FormControlLabel value="Female" control={<Radio />} label="Female" />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel value="Custom" control={<Radio />} label="Custom" />
            </RadioGroup>

            <TextField name="email" label="Email" fullWidth sx={{ mb: 2 }} value={formData.email} onChange={handleChange} />
            <TextField name="password" label="New password" type="password" fullWidth sx={{ mb: 2 }} value={formData.password} onChange={handleChange} />

            <Box sx={{ mb: 2, textAlign: "center" }}>
              <Typography variant="body2">Upload Profile Picture</Typography>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {uploading && <Typography variant="body2" color="textSecondary">Uploading...</Typography>}
              <Box sx={{ width: 100, height: 100, margin: "10px auto", borderRadius: "50%", overflow: "hidden", background: "#f0f2f5" }}>
                {formData.profilePicture && <img src={formData.profilePicture} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
              </Box>
            </Box>

            <TextField name="bio" label="Bio" fullWidth multiline rows={3} sx={{ mb: 2 }} value={formData.bio} onChange={handleChange} />
            <Button type="submit" fullWidth className="signup-btn">
              Sign Up
            </Button>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <MuiLink component={RouterLink} to="/" underline="hover">
                Already have an account?
              </MuiLink>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
