// src/components/Feed.jsx
import React, { useEffect, useState } from "react";
import { 
  Box, Card, CardHeader, CardContent, Avatar, IconButton, Typography 
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
  const theme = useTheme();

  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const response = await api.get("/posts/random");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching random posts", error);
      }
    };
    fetchRandomPosts();
  }, []);

  // For demonstration purposes, current user id is obtained from localStorage.
  const currentUserId = localStorage.getItem("userId");

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
            <Box sx={{ display: "flex", alignItems: "center", p: 1, pl: 2 }}>
              <IconButton onClick={() => { /* Implement like functionality */ }}>
                {isLikedByUser ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2" sx={{ mr: 3 }}>
                {post.likes?.length || 0}
              </Typography>
              <IconButton onClick={() => { /* Implement comment functionality */ }}>
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
          </Card>
        );
      })}
    </Box>
  );
};

export default Feed;
