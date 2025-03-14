import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// ✅ Create API instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Handle Unauthorized & Forbidden Errors (Auto Logout)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.error("Unauthorized! Logging out...");
      localStorage.removeItem("token"); // Clear token
      if (window.location.pathname !== "/") {
        window.location.href = "/"; // Redirect to login only if not already there
      }
    } else if (status === 403) {
      console.error("Access Denied: You do not have permission.");
      alert("You do not have permission to perform this action.");
    } else {
      console.error("API Response Error:", error);
    }

    return Promise.reject(error);
  }
);

export default api;
