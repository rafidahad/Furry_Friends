import React, { useState, useEffect } from 'react';
import { 
  Box, Drawer, Typography, Card, CardHeader, CardContent, Avatar, IconButton 
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../components/Navbar';
import LeftSidebarDesktop from '../components/LeftSidebarDesktop';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebarDesktop from '../components/RightSidebarDesktop';
import api from '../services/api';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

const Popular = () => {
  const [posts, setPosts] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  // Toggle mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  // Fetch posts and sort by likes in descending order
  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        // Fetch posts (using /posts/random here—adjust if needed)
        const response = await api.get("/posts/random");
        let fetchedPosts = response.data;
        // Sort posts by number of likes descending
        fetchedPosts = fetchedPosts.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching popular posts:", error);
      }
    };
    fetchPopularPosts();
  }, []);

  // For like button demonstration, assume current user ID is stored in localStorage
  const currentUserId = localStorage.getItem("userId");

  return (
    <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Navbar onMenuClick={handleDrawerToggle} />
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
          sx={{ flex: 1, marginLeft: { xs: 0, md: '240px' }, p: 2, maxWidth: '800px' }}
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
                  <IconButton onClick={() => { /* like functionality */ }}>
                    {isLikedByUser ? (
                      <FavoriteIcon sx={{ color: 'red' }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <Typography variant="body2" sx={{ mr: 3 }}>
                    {post.likes?.length || 0}
                  </Typography>
                  <IconButton onClick={() => { /* comment functionality */ }}>
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
        {isLgUp && <RightSidebarDesktop in={isLgUp} />}
      </Box>
    </Box>
  );
};

export default Popular;
