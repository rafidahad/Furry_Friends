import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // ✅ Import icons
import api from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./LoginSignUp.css";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import LoadingScreen from "./LoadingScreen";
import furryLogo from "../assets/furryFriends_header_logo.png";
import * as Yup from "yup";

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ State to toggle password visibility
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().required("No password provided."),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await api.post("/auth/login", values);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      } catch (err) {
        setError(err.response?.data?.error || "Invalid email or password.");
        setLoading(false);
      }
    },
  });

  if (loading) return <LoadingScreen />;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="login-wrapper">
        <div className="header text-center">
          <img src={furryLogo} alt="Website Logo" className="img-fluid mb-3" style={{ maxHeight: "80px" }} />
          <Typography variant="h3" sx={{ fontWeight: "bold", color: "#4a90e2" }}>Login</Typography>
        </div>
        <form onSubmit={formik.handleSubmit} className="inputs">
          {/* Email Input */}
          <div className="input mb-3">
            <img src={email_icon} alt="Email Icon" />
            <input type="text" name="email" placeholder="Enter Email"
              value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          </div>
          {formik.touched.email && formik.errors.email && <div style={{ color: "red" }}>{formik.errors.email}</div>}

          {/* Password Input with Show/Hide Toggle */}
          <div className="input mb-3">
            <img src={password_icon} alt="Password Icon" />
            <input
              type={showPassword ? "text" : "password"} // ✅ Toggle password visibility
              name="password"
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* ✅ Show/Hide Password Button */}
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          </div>
          {formik.touched.password && formik.errors.password && <div style={{ color: "red" }}>{formik.errors.password}</div>}

          {/* Submit Buttons */}
          <div className="submit-container">
            <Link to="/signup" className="btn">Create an Account</Link>
            <Button type="submit">Login</Button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </Box>
  );
}

export default Login;
