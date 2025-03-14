import React, { useEffect, useState } from "react";
import { Box, Drawer, Avatar, Button, Typography, Card, CardContent, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ Import API service

import Navbar from "../components/Navbar";
import LeftSidebarDesktop from "../components/LeftSidebarDesktop";
import LeftSidebar from "../components/LeftSidebar";

const MyProfile = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUser(response.data);
      } catch (error) {
        navigate("/login"); // ✅ Redirect to login if not authenticated
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCreatePost = async () => {
    if (postContent.trim()) {
      try {
        await api.post("/posts/create", { content: postContent }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setPostContent("");
        alert("Post created successfully!");
      } catch (error) {
        alert("Error creating post.");
      }
    }
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      {/* Navbar */}
      <Navbar onMenuClick={handleDrawerToggle} showSearch={true} />

      {/* Desktop Sidebar */}
      {isMdUp && <LeftSidebarDesktop in={isMdUp} />}

      {/* Mobile Drawer */}
      {!isMdUp && (
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
          <LeftSidebar />
        </Drawer>
      )}

      {/* Main Content */}
      <Box sx={{ display: "flex", justifyContent: "center", pt: "64px" }}>
        <Box component="main" sx={{ flex: 1, marginLeft: { xs: 0, md: "240px" }, p: 2, maxWidth: "800px" }}>
          {user ? (
            <>
              {/* User Info Card */}
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar alt="Profile Picture" src={user.profilePicture} sx={{ width: 64, height: 64, mr: 2 }} />
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {user.firstName} {user.surname}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Stats */}
                  <Box sx={{ display: "flex", gap: 4, mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Followers
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {user.followers.length}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Following
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {user.following.length}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Posts
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {user.postsCount}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              {/* Create Post Card */}
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Create a Post
                  </Typography>
                  <TextField
                    multiline
                    rows={3}
                    fullWidth
                    placeholder="What's on your mind?"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Button variant="contained" onClick={handleCreatePost} disabled={!postContent.trim()}>
                    Post
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              Loading profile...
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
