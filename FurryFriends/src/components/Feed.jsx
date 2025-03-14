// src/components/Feed.jsx
import React, { useState, useEffect } from "react";
import { 
  Box, Card, CardHeader, CardContent, Avatar, IconButton, Typography, TextField, Button 
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@mui/material/styles";
import api from "../services/api";

// Helper to compute relative time
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

const Feed = () => {
  const [posts, setPosts] = useState([]);
  // State to control comment input visibility and text per post
  const [commentBoxOpen, setCommentBoxOpen] = useState({});
  const [newCommentText, setNewCommentText] = useState({});
  
  const theme = useTheme();
  
  // Assume the current user id is stored in localStorage (or adjust as needed)
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?._id || localStorage.getItem("userId");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Adjust this endpoint if needed. It should return an array of posts.
        const response = await api.get("/posts/random");
        // Optionally sort posts by some criteria here
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Handle like functionality
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
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // Toggle comment box visibility
  const handleCommentToggle = (postId) => {
    setCommentBoxOpen((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  // Handle comment text change
  const handleCommentChange = (postId, value) => {
    setNewCommentText((prev) => ({ ...prev, [postId]: value }));
  };

  // Add a new comment
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

  return (
    <Box>
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
                <Box sx={{ display: "flex", alignItems: "center" }}>
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
            <Box sx={{ display: "flex", alignItems: "center", p: 1, pl: 2 }}>
              <IconButton onClick={() => handleLike(post._id)}>
                {isLikedByUser ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
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
  );
};

export default Feed;
