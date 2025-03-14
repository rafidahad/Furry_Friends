import React, { useEffect, useState } from "react";
import { 
  Box, Drawer, Avatar, Button, Typography, Card, CardContent, 
  TextField, Dialog, DialogActions, DialogContent, DialogTitle 
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import LeftSidebarDesktop from "../components/LeftSidebarDesktop";
import LeftSidebar from "../components/LeftSidebar";

const MyProfile = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewProfilePicture, setPreviewProfilePicture] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await api.get("/auth/profile");
        console.log("Fetched Profile Data:", response.data); // Debug API response
        setUser(response.data);
      } catch (error) {
        console.error("Profile Fetch Error:", error);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ✅ Create a new post
  const handleCreatePost = async () => {
    if (postContent.trim()) {
      try {
        await api.post("/posts/create", { content: postContent });

        setPostContent("");
        alert("Post created successfully!");

        setUser((prevUser) => ({
          ...prevUser,
          postsCount: prevUser.postsCount + 1,
        }));
      } catch (error) {
        console.error("Error creating post:", error);
        alert("Error creating post.");
      }
    }
  };

  // ✅ Open Edit Profile Modal
  const handleOpenEditModal = () => {
    setNewUsername(user?.username);
    setNewBio(user?.profile?.bio || "");
    setPreviewProfilePicture(user?.profile?.profilePicture || "");
    setOpenEditModal(true);
  };

  // ✅ Handle Profile Picture Change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePicture(file);
    setPreviewProfilePicture(URL.createObjectURL(file)); 
  };

  // ✅ Save Profile Changes
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      let profilePictureUrl = user.profile.profilePicture; // Ensure correct field
  
      if (newProfilePicture) {
        const formData = new FormData();
        formData.append("file", newProfilePicture);
  
        const uploadRes = await api.post("/upload/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        profilePictureUrl = uploadRes.data.url;
      }
  
      const updatedData = {
        username: newUsername,
        bio: newBio,
        profilePicture: profilePictureUrl, // 🔹 Ensure this is correctly assigned
        gender: user.profile.gender, // Ensure this doesn't get lost
        dob: user.profile.dob, // Keep the date of birth
      };
  
      const response = await api.put("/auth/profile", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
  
      setUser(response.data);
      setOpenEditModal(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile Update Error:", error);
      alert("Failed to update profile.");
    }
  };
  
  

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      <Navbar onMenuClick={handleDrawerToggle} showSearch={true} />

      {isMdUp && <LeftSidebarDesktop in={isMdUp} />}

      {!isMdUp && (
        <Drawer anchor="left" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }}>
          <LeftSidebar />
        </Drawer>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", pt: "64px" }}>
        <Box component="main" sx={{ flex: 1, marginLeft: { xs: 0, md: "240px" }, p: 2, maxWidth: "800px" }}>
          {loading ? (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              Loading profile...
            </Typography>
          ) : user ? (
            <>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar 
                      alt="Profile Picture" 
                      src={user?.profile?.profilePicture || "default-profile.png"} 
                      sx={{ width: 64, height: 64, mr: 2 }} 
                    />
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {user.username}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                        {user?.profile?.bio ? `"${user.profile.bio}"` : "No bio added yet."}
                      </Typography>
                    </Box>
                    <Button variant="outlined" sx={{ ml: "auto" }} onClick={handleOpenEditModal}>
                      Edit Profile
                    </Button>
                  </Box>
                </CardContent>
              </Card>

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

              <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                  <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                  {previewProfilePicture && (
                    <Avatar src={previewProfilePicture} sx={{ width: 80, height: 80, mt: 1 }} />
                  )}
                  <TextField fullWidth label="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} sx={{ mt: 2 }} />
                  <TextField fullWidth label="Bio" multiline rows={2} value={newBio} onChange={(e) => setNewBio(e.target.value)} sx={{ mt: 2 }} />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
                  <Button variant="contained" onClick={handleSaveProfile}>Save</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4, color: "red" }}>
              Error loading profile. Please try again later.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MyProfile;
