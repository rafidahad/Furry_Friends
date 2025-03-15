// src/pages/UserProfile.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Drawer,
  Avatar,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import LeftSidebarDesktop from "../components/LeftSidebarDesktop";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebarDesktop from "../components/RightSidebarDesktop";

// Icons
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";

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

const UserProfile = ({ toggleTheme, darkMode }) => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [followLoading, setFollowLoading] = useState(false);

  // Message dialog state
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const { username } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Fetch the user profile by username
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/auth/profile/${username}`);

        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setSnackbar({ open: true, message: "Failed to fetch user profile", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [username, navigate]);

  // Fetch the posts for the user
  useEffect(() => {
    const fetchPosts = async () => {
      if (profile && profile._id) {
        try {
          const response = await api.get(`/posts/user/${profile._id}`);
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };
    fetchPosts();
  }, [profile]);

  // Get current user ID
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id;

  // Follow/unfollow handler
  const handleFollow = async () => {
    if (!profile) return;
    setFollowLoading(true);
    try {
      const response = await api.post(`/auth/follow/${profile._id}`);
      // After toggling follow, refetch profile data
      const updatedProfile = await api.get(`/auth/profile/${username}`);
      setProfile(updatedProfile.data);
      setSnackbar({ open: true, message: response.data.message, severity: "success" });
    } catch (error) {
      console.error("Error toggling follow:", error);
      setSnackbar({ open: true, message: "Failed to follow/unfollow", severity: "error" });
    } finally {
      setFollowLoading(false);
    }
  };

  // Message dialog handlers
  const handleOpenMessageDialog = () => {
    setMessageDialogOpen(true);
  };

  const handleCloseMessageDialog = () => {
    setMessageDialogOpen(false);
    setMessageContent("");
  };

  const handleSendMessage = async () => {
    try {
      await api.post("/messages", {
        receiver: profile._id,
        content: messageContent,
      });
      setSnackbar({ open: true, message: "Message sent successfully!", severity: "success" });
      handleCloseMessageDialog();
    } catch (error) {
      console.error("Error sending message:", error);
      setSnackbar({ open: true, message: "Failed to send message", severity: "error" });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">Loading profile...</Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h6">User not found</Typography>
      </Box>
    );
  }

  // Check if current user is following this profile
  const isFollowing = profile.followers?.some(
    (follower) => follower._id === currentUserId
  );

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
      <Navbar onMenuClick={() => {}} toggleTheme={toggleTheme} darkMode={darkMode} />
      {isMdUp ? <LeftSidebarDesktop in={isMdUp} /> : <LeftSidebar mobile />}
      <Box sx={{ display: "flex", justifyContent: "center", pt: "64px" }}>
        <Box sx={{ flex: 1, marginLeft: { xs: 0, md: "240px" }, p: 2, maxWidth: "800px" }}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Avatar
                  alt="Profile Picture"
                  src={profile?.profile?.profilePicture || "default-profile.png"}
                  sx={{ width: 64, height: 64, mr: 2 }}
                />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {profile.username}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, fontStyle: "italic" }}>
                    {profile?.profile?.bio || "No bio added yet."}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                    <Typography variant="body2">
                      Followers: {profile.followers ? profile.followers.length : 0}
                    </Typography>
                    <Typography variant="body2">
                      Following: {profile.following ? profile.following.length : 0}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ ml: "auto" }}>
                  <Button
                    variant="contained"
                    onClick={handleFollow}
                    disabled={followLoading}
                    sx={{ mr: 1 }}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </Button>
                  <IconButton onClick={handleOpenMessageDialog}>
                    <MessageIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Optionally, display the user's posts */}
          {posts.map((post) => (
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
              />
              <CardContent>
                <Typography variant="body1">{post.content}</Typography>
                {post.media &&
                  (post.mediaType === "video" ? (
                    <video
                      src={post.media}
                      controls
                      style={{ maxWidth: "100%", marginTop: "8px" }}
                    />
                  ) : (
                    <img
                      src={post.media}
                      alt="Post media"
                      style={{ maxWidth: "100%", marginTop: "8px" }}
                    />
                  ))}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onClose={handleCloseMessageDialog} fullWidth maxWidth="sm">
        <DialogTitle>Send a Message</DialogTitle>
        <DialogContent>
          <TextField
            label="Your Message"
            fullWidth
            multiline
            rows={4}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMessageDialog}>Cancel</Button>
          <Button variant="contained" onClick={handleSendMessage} disabled={!messageContent.trim()}>
            Send
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};

export default UserProfile;
