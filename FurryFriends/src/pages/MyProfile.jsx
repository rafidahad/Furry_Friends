// src/pages/MyProfile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Avatar,
  Button,
  Typography,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  CardHeader,
  IconButton,
  Select,
  MenuItem,
  Menu
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import Navbar from "../components/Navbar";
import LeftSidebarDesktop from "../components/LeftSidebarDesktop";
import LeftSidebar from "../components/LeftSidebar";

// Icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Import the CreatePostDialog component
import CreatePostDialog from "../components/CreatePostDialog";

const MyProfile = ({ toggleTheme, darkMode }) => {
  // ---------- Local State ----------
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);  
  const [loading, setLoading] = useState(true);

  // Edit profile states
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [previewProfilePicture, setPreviewProfilePicture] = useState("");

  // Snackbar state for notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Comment UI states
  const [commentBoxOpen, setCommentBoxOpen] = useState({});
  const [newCommentText, setNewCommentText] = useState({});

  // For post menu (delete option) – declare only once
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);

  // State for Create Post Dialog
  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // ---------- Helper: Compute Relative Time ----------
  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) return interval + " year" + (interval > 1 ? "s" : "") + " ago";
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return interval + " month" + (interval > 1 ? "s" : "") + " ago";
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + " day" + (interval > 1 ? "s" : "") + " ago";
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + " hour" + (interval > 1 ? "s" : "") + " ago";
    interval = Math.floor(seconds / 60);
    if (interval >= 1) return interval + " minute" + (interval > 1 ? "s" : "") + " ago";
    return Math.floor(seconds) + " seconds ago";
  };

  // ---------- Fetch User Profile ----------
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); // Redirect to login if not authenticated
        return;
      }
      try {
        const response = await api.get("/auth/profile");
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

  // ---------- Fetch Posts ----------
  useEffect(() => {
    const fetchPosts = async () => {
      if (user && user._id) {
        try {
          const response = await api.get(`/posts/user/${user._id}`);
          setPosts(response.data);
        } catch (err) {
          console.error("Error fetching posts", err);
        }
      }
    };
    fetchPosts();
  }, [user]);

  // ---------- Drawer Toggle ----------
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ---------- Profile Editing Logic ----------
  const handleOpenEditModal = () => {
    setNewUsername(user?.username);
    setNewBio(user?.profile?.bio || "");
    setPreviewProfilePicture(user?.profile?.profilePicture || "");
    setOpenEditModal(true);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePicture(file);
    setPreviewProfilePicture(URL.createObjectURL(file));
  };

  const handleSaveProfile = async () => {
    try {
      let profilePictureUrl = user.profile.profilePicture;
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
        profilePicture: profilePictureUrl,
        gender: user.profile.gender,
        dob: user.profile.dob,
      };
      const response = await api.put("/auth/profile", updatedData);
      setUser(response.data);
      setOpenEditModal(false);
      setSnackbar({ open: true, message: "Profile updated successfully!", severity: "success" });
    } catch (error) {
      console.error("Profile Update Error:", error);
      setSnackbar({ open: true, message: "Failed to update profile.", severity: "error" });
    }
  };

  // ---------- onPostCreated Callback for CreatePostDialog ----------
  const handlePostCreated = (newPost) => {
    // Insert new post at the top of the posts list
    setPosts((prev) => [newPost, ...prev]);
    setSnackbar({ open: true, message: "Post created successfully!", severity: "success" });
  };

  // ---------- Like / Comment Logic ----------
  const handleLike = async (postId) => {
    try {
      await api.put(`/posts/like/${postId}`);
      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p._id === postId) {
            const alreadyLiked = p.likes.includes(user._id);
            let updatedLikes = alreadyLiked
              ? p.likes.filter((id) => id !== user._id)
              : [...p.likes, user._id];
            return { ...p, likes: updatedLikes };
          }
          return p;
        })
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleCommentToggle = (postId) => {
    setCommentBoxOpen((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentChange = (postId, value) => {
    setNewCommentText((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = async (postId) => {
    const text = newCommentText[postId]?.trim();
    if (!text) return;
    try {
      const res = await api.put(`/posts/comment/${postId}`, { text });
      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p._id === postId) {
            return { ...p, comments: res.data.comments };
          }
          return p;
        })
      );
      setNewCommentText((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  // ---------- Post Menu (Delete) Logic ----------
  const handleMenuOpen = (postId, event) => {
    setSelectedPostId(postId);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setSelectedPostId(null);
  };

  const handleDeletePost = async () => {
    try {
      await api.delete(`/posts/${selectedPostId}`);
      setPosts((prev) => prev.filter((p) => p._id !== selectedPostId));
      setSnackbar({ open: true, message: "Post deleted successfully!", severity: "success" });
      handleMenuClose();
    } catch (error) {
      console.error("Error deleting post", error);
      setSnackbar({ open: true, message: "Failed to delete post.", severity: "error" });
      handleMenuClose();
    }
  };

  // ---------- Snackbar ----------
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // ---------- Render ----------
  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      <Navbar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} darkMode={darkMode} />
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
              {/* Profile Card */}
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
                        {user?.profile?.bio || "No bio added yet."}
                      </Typography>
                      {/* Follower / Following counts */}
                      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                        <Button variant="text" onClick={() => {/* open followers modal */}}>
                          Followers: {user.followers ? user.followers.length : 0}
                        </Button>
                        <Button variant="text" onClick={() => {/* open following modal */}}>
                          Following: {user.following ? user.following.length : 0}
                        </Button>
                      </Box>
                    </Box>
                    <Button variant="outlined" sx={{ ml: "auto" }} onClick={handleOpenEditModal}>
                      Edit Profile
                    </Button>
                  </Box>
                </CardContent>
              </Card>

              {/* Create Post Button (Dialog) */}
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Create a Post
                  </Typography>
                  <Button variant="contained" onClick={() => setOpenCreateDialog(true)}>
                    Create Post
                  </Button>
                </CardContent>
              </Card>

              {/* Posts Listing */}
              {posts.map((post) => {
                const isLikedByUser = post.likes?.includes(user._id);
                return (
                  <Card key={post._id} sx={{ mb: 2 }}>
                    <CardHeader
                      avatar={
                        <Avatar
                          src={post.user?.profile?.profilePicture || ""}
                          alt={post.user?.username || "User"}
                        />
                      }
                      title={post.title || "Untitled Post"}
                      subheader={`Posted by ${post.user?.username || "Unknown"} • ${timeAgo(post.createdAt)}`}
                      action={
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {post.petTag}
                          </Typography>
                          <IconButton onClick={(e) => handleMenuOpen(post._id, e)}>
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                      }
                    />
                    <CardContent>
                      <Typography variant="body1">{post.content}</Typography>
                      {post.media && (
                        post.mediaType === "video" ? (
                          <video src={post.media} controls style={{ maxWidth: "100%", marginTop: "8px" }} />
                        ) : (
                          <img src={post.media} alt="Post media" style={{ maxWidth: "100%", marginTop: "8px" }} />
                        )
                      )}
                    </CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", p: 1, pl: 2 }}>
                      <IconButton onClick={() => handleLike(post._id)}>
                        {isLikedByUser ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <Typography variant="body2" sx={{ mr: 3 }}>
                        {post.likes?.length || 0}
                      </Typography>
                      <IconButton onClick={() => handleCommentToggle(post._id)}>
                        <ChatBubbleOutlineIcon />
                      </IconButton>
                      <Typography variant="body2" sx={{ mr: 3 }}>
                        {post.comments?.length || 0}
                      </Typography>
                      <IconButton onClick={() => alert("Share feature not implemented yet!")}>
                        <ShareIcon />
                      </IconButton>
                      <Typography variant="body2">0</Typography>
                    </Box>
                    {commentBoxOpen[post._id] && (
                      <Box sx={{ px: 2, pb: 2 }}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          placeholder="Write a comment..."
                          value={newCommentText[post._id] || ""}
                          onChange={(e) => handleCommentChange(post._id, e.target.value)}
                          sx={{ mt: 1 }}
                        />
                        <Button
                          variant="contained"
                          onClick={() => handleAddComment(post._id)}
                          endIcon={<SendIcon />}
                          sx={{ mt: 1 }}
                        >
                          Comment
                        </Button>
                        {post.comments?.map((c) => (
                          <Box key={c._id} sx={{ mt: 2, borderLeft: "2px solid #ccc", pl: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                              {c.user?.username || "Unknown"}
                            </Typography>
                            <Typography variant="body2">{c.text}</Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Card>
                );
              })}

              {/* Post Menu for Delete */}
              <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
              </Menu>

              {/* Edit Profile Modal */}
              <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                  <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                  {previewProfilePicture && (
                    <Avatar src={previewProfilePicture} sx={{ width: 80, height: 80, mt: 1 }} />
                  )}
                  <TextField
                    fullWidth
                    label="Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    multiline
                    rows={2}
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    sx={{ mt: 2 }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenEditModal(false)}>Cancel</Button>
                  <Button variant="contained" onClick={handleSaveProfile}>Save</Button>
                </DialogActions>
              </Dialog>
            </>
          ) : null}
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* CreatePostDialog for new posts */}
      <CreatePostDialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        onPostCreated={handlePostCreated}
      />
    </Box>
  );
};

export default MyProfile;
