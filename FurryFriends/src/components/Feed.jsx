// src/components/Feed.jsx
import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Feed = () => {
  // Manage post interactions (likes, shares) and a boolean "liked" status per post.
  const [postInteractions, setPostInteractions] = useState({
    1: { likes: 0, shares: 0, liked: false },
    2: { likes: 0, shares: 0, liked: false },
  });

  // Toggle comment box for each post (by id)
  const [commentBoxOpen, setCommentBoxOpen] = useState({});

  // New comment text for each post (by id)
  const [newCommentText, setNewCommentText] = useState({});

  // Store comments per post (each comment: { id, text, likes, liked, replies })
  const [postComments, setPostComments] = useState({
    1: [],
    2: [],
  });

  // Toggle reply box for a given comment in a post.
  // Structure: { [postId]: { [commentId]: true/false } }
  const [replyBoxOpen, setReplyBoxOpen] = useState({});

  // New reply text per comment per post.
  // Structure: { [postId]: { [commentId]: string } }
  const [newReplyText, setNewReplyText] = useState({});

  const handleLike = (postId) => {
    setPostInteractions((prev) => {
      const liked = !prev[postId].liked;
      const likeCount = liked ? prev[postId].likes + 1 : Math.max(prev[postId].likes - 1, 0);
      return {
        ...prev,
        [postId]: { ...prev[postId], liked, likes: likeCount },
      };
    });
  };

  const handleShare = (postId) => {
    setPostInteractions((prev) => ({
      ...prev,
      [postId]: { ...prev[postId], shares: prev[postId].shares + 1 },
    }));
  };

  const handleCommentButton = (postId) => {
    setCommentBoxOpen((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleSubmitComment = (postId) => {
    const commentText = newCommentText[postId] || '';
    if (commentText.trim() === '') return;
    const newComment = {
      id: Date.now(), // a simple unique id
      text: commentText,
      likes: 0,
      liked: false,
      replies: [],
    };
    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));
    setNewCommentText((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleLikeComment = (postId, commentId) => {
    setPostComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) => {
        if (comment.id === commentId) {
          const liked = !comment.liked;
          const likes = liked ? comment.likes + 1 : Math.max(comment.likes - 1, 0);
          return { ...comment, liked, likes };
        }
        return comment;
      }),
    }));
  };

  const handleToggleReply = (postId, commentId) => {
    setReplyBoxOpen((prev) => ({
      ...prev,
      [postId]: { ...prev[postId], [commentId]: !((prev[postId] && prev[postId][commentId]) || false) },
    }));
  };

  const handleSubmitReply = (postId, commentId) => {
    const replyText = (newReplyText[postId] && newReplyText[postId][commentId]) || '';
    if (replyText.trim() === '') return;
    const newReply = {
      id: Date.now(),
      text: replyText,
      likes: 0,
      liked: false,
    };
    setPostComments((prev) => ({
      ...prev,
      [postId]: prev[postId].map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        return comment;
      }),
    }));
    setNewReplyText((prev) => ({
      ...prev,
      [postId]: { ...prev[postId], [commentId]: '' },
    }));
  };

  // Sample posts data.
  const posts = [
    {
      id: 1,
      author: 'John Doe',
      avatar: '',
      title: 'My dog just had puppies!',
      content: 'Look at these cute puppies I have at home!',
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: '',
      title: 'Lost my cat in the neighborhood',
      content: 'Any suggestions on how to find her?',
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '640px', mx: 'auto', mt: 2 }}>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardHeader
            avatar={<Avatar src={post.avatar} alt={post.author} />}
            title={post.title}
            subheader={`Posted by ${post.author}`}
          />
          <CardContent>
            <Typography variant="body1">{post.content}</Typography>
          </CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1 }}>
            <IconButton onClick={() => handleLike(post.id)}>
              {postInteractions[post.id].liked ? (
                <FavoriteIcon sx={{ color: 'red' }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography variant="body2">{postInteractions[post.id].likes}</Typography>

            <IconButton onClick={() => handleCommentButton(post.id)}>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2">
              {postComments[post.id] ? postComments[post.id].length : 0}
            </Typography>

            <IconButton onClick={() => handleShare(post.id)}>
              <ShareIcon />
            </IconButton>
            <Typography variant="body2">{postInteractions[post.id].shares}</Typography>
          </Box>

          {/* Comment Section */}
          {commentBoxOpen[post.id] && (
            <Box sx={{ p: 2 }}>
              {/* New Comment Input */}
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                placeholder="Write a comment..."
                value={newCommentText[post.id] || ''}
                onChange={(e) =>
                  setNewCommentText((prev) => ({ ...prev, [post.id]: e.target.value }))
                }
              />
              <Button onClick={() => handleSubmitComment(post.id)} variant="contained" sx={{ mt: 1 }}>
                Submit Comment
              </Button>
              {/* Display Comments */}
              {postComments[post.id] &&
                postComments[post.id].map((comment) => (
                  <Box key={comment.id} sx={{ mt: 2, borderLeft: '2px solid #ccc', pl: 1 }}>
                    <Typography variant="body2">{comment.text}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton size="small" onClick={() => handleLikeComment(post.id, comment.id)}>
                        {comment.liked ? (
                          <ThumbUpIcon sx={{ color: 'blue' }} fontSize="small" />
                        ) : (
                          <ThumbUpOffAltIcon fontSize="small" />
                        )}
                      </IconButton>
                      <Typography variant="caption">{comment.likes}</Typography>
                      <Button size="small" onClick={() => handleToggleReply(post.id, comment.id)}>
                        Reply
                      </Button>
                    </Box>
                    {/* Reply Input */}
                    {replyBoxOpen[post.id] && replyBoxOpen[post.id][comment.id] && (
                      <Box sx={{ ml: 2, mt: 1 }}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          placeholder="Write a reply..."
                          value={(newReplyText[post.id] && newReplyText[post.id][comment.id]) || ''}
                          onChange={(e) =>
                            setNewReplyText((prev) => ({
                              ...prev,
                              [post.id]: {
                                ...prev[post.id],
                                [comment.id]: e.target.value,
                              },
                            }))
                          }
                        />
                        <Button
                          onClick={() => handleSubmitReply(post.id, comment.id)}
                          variant="contained"
                          sx={{ mt: 1 }}
                        >
                          Submit Reply
                        </Button>
                      </Box>
                    )}
                    {/* Display Replies */}
                    {comment.replies.map((reply) => (
                      <Box key={reply.id} sx={{ ml: 2, mt: 1, borderLeft: '2px solid #ddd', pl: 1 }}>
                        <Typography variant="caption">{reply.text}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <IconButton size="small" onClick={() => {/* Optionally handle reply likes */}}>
                            {reply.liked ? (
                              <ThumbUpIcon sx={{ color: 'blue' }} fontSize="small" />
                            ) : (
                              <ThumbUpOffAltIcon fontSize="small" />
                            )}
                          </IconButton>
                          <Typography variant="caption">{reply.likes}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ))}
            </Box>
          )}
        </Card>
      ))}
    </Box>
  );
};

export default Feed;
