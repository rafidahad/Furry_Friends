// src/theme.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#4a90e2" },
    secondary: { main: "#f5a623" },
    background: { default: "#f4f4f4" },
    text: { primary: "#333333", secondary: "#666666" },
  },
  typography: {
    // Use Futura font across your site. Make sure Futura is available,
    // or include a fallback chain.
    fontFamily: '"Futura", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: "none" } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
          background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
          color: "#fff",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          "&:hover": {
            background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#ffb74d" },
    background: { default: "#121212" },
    text: { primary: "#ffffff", secondary: "#b0bec5" },
  },
  typography: {
    // Use Futura font across your site
    fontFamily: '"Futura", "Roboto", "Helvetica", "Arial", sans-serif',
    h6: { fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: "none" } },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
          background: "linear-gradient(45deg, #90caf9 30%, #ffb74d 90%)",
          color: "#fff",
          boxShadow: "0 3px 5px 2px rgba(255, 140, 0, .3)",
          "&:hover": {
            background: "linear-gradient(45deg, #ffb74d 30%, #90caf9 90%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
        },
      },
    },
  },
});
