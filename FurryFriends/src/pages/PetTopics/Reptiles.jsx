// src/pages/ReptilesPosts.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Drawer, Typography, Card, CardHeader, CardContent, Avatar, IconButton, TextField, Button 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../../components/Navbar';
import LeftSidebarDesktop from '../../components/LeftSidebarDesktop';
import LeftSidebar from '../../components/LeftSidebar';
import RightSidebarDesktop from '../../components/RightSidebarDesktop';
import api from '../../services/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';

// Helper function to compute relative time
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

const ReptilesPosts = ({ toggleTheme, darkMode }) => {
  const [posts, setPosts] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commentBoxOpen, setCommentBoxOpen] = useState({});
  const [newCommentText, setNewCommentText] = useState({});

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  // Fetch posts tagged "Reptiles" and sort by likes descending
  useEffect(() => {
    const fetchReptilesPosts = async () => {
      try {
        const response = await api.get("/posts/tag/Reptiles");
        let fetchedPosts = response.data;
        fetchedPosts = fetchedPosts.sort(
          (a, b) => (b.likes?.length || 0) - (a.likes?.length || 0)
        );
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching reptiles posts:", error);
      }
    };
    fetchReptilesPosts();
  }, []);

  // Retrieve current user ID from localStorage
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id || localStorage.getItem("userId");

  // Like functionality: update local state after API call
  const handleLike = async (postId) => {
    try {
      await api.put(`/posts/like/${postId}`);
      setPosts((prevPosts) =>
        prevPosts.map((p) => {
          if (p._id === postId) {
            const alreadyLiked = p.likes.includes(currentUserId);
            const updatedLikes = alreadyLiked
              ? p.likes.filter((id) => id !== currentUserId)
              : [...p.likes, currentUserId];
            return { ...p, likes: updatedLikes };
          }
          return p;
        })
      );
    } catch (error) {
      console.error("Error liking post:", error);
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
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Navbar onMenuClick={handleDrawerToggle} toggleTheme={toggleTheme} darkMode={darkMode} />
      {isMdUp && <LeftSidebarDesktop in={isMdUp} />}
      {!isMdUp && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          <LeftSidebar mobile />
        </Drawer>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: '64px' }}>
        <Box
          component="main"
          sx={{
            flex: 1,
            marginLeft: { xs: 0, md: '240px' },
            p: 2,
            maxWidth: '800px',
          }}
        >
          {posts.map((post) => {
            const isLikedByUser = post.likes?.includes(currentUserId);
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
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>
                        {post.petTag}
                      </Typography>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  }
                />
                <CardContent>
                  <Typography variant="body1">{post.content}</Typography>
                  {post.media && (
                    post.mediaType === "video" ? (
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
                    )
                  )}
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', p: 1, pl: 2 }}>
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
        </Box>
        {isLgUp && <RightSidebarDesktop in={isLgUp} />}
      </Box>
    </Box>
  );
};

export default ReptilesPosts;
