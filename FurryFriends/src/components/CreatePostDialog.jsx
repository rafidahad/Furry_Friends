// src/components/CreatePostDialog.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import api from "../services/api";

const CreatePostDialog = ({ open, onClose, onPostCreated }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [petTag, setPetTag] = useState("General");
  const [mediaFile, setMediaFile] = useState(null);

  // Preview URL for attached file
  const [previewUrl, setPreviewUrl] = useState(null);

  // Revoke the object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      // If user cancels or no file selected
      setMediaFile(null);
      setPreviewUrl(null);
      return;
    }
    setMediaFile(file);
    // Create a temporary URL for preview
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Create Post
  const handleCreatePost = async () => {
    try {
      if (!postTitle.trim() && !postContent.trim() && !mediaFile) return;

      let mediaUrl = "";
      let mediaType = "text";

      if (mediaFile) {
        const isVideo = mediaFile.type.startsWith("video");
        const uploadEndpoint = isVideo ? "/upload/video" : "/upload/image";
        const formData = new FormData();
        formData.append("file", mediaFile);

        const uploadRes = await api.post(uploadEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        mediaUrl = uploadRes.data.url;
        mediaType = isVideo ? "video" : "image";
      }

      const newPostData = {
        title: postTitle,
        content: postContent,
        petTag,
        media: mediaUrl,
        mediaType,
      };

      const response = await api.post("/posts/create", newPostData);

      // Reset fields
      setPostTitle("");
      setPostContent("");
      setPetTag("General");
      setMediaFile(null);
      setPreviewUrl(null);

      if (onPostCreated) {
        onPostCreated(response.data);
      }

      onClose();
    } catch (err) {
      console.error("Error creating post:", err);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a Post</DialogTitle>
      <DialogContent>
        {/* Post Title */}
        <TextField
          label="Post Title"
          fullWidth
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          sx={{ mt: 2 }}
        />

        {/* Pet Tag Dropdown */}
        <Select
          fullWidth
          value={petTag}
          onChange={(e) => setPetTag(e.target.value)}
          sx={{ mt: 2 }}
        >
          <MenuItem value="Dogs">Dogs</MenuItem>
          <MenuItem value="Cats">Cats</MenuItem>
          <MenuItem value="Fish">Fish</MenuItem>
          <MenuItem value="Birds">Birds</MenuItem>
          <MenuItem value="Rabbits">Rabbits</MenuItem>
          <MenuItem value="Hamsters">Hamsters</MenuItem>
          <MenuItem value="Guinea Pigs">Guinea Pigs</MenuItem>
          <MenuItem value="Reptiles">Reptiles</MenuItem>
          <MenuItem value="Ferrets">Ferrets</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
          <MenuItem value="General">General</MenuItem>
        </Select>

        {/* Post Content */}
        <TextField
          label="Write a post..."
          multiline
          rows={3}
          fullWidth
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          sx={{ mt: 2 }}
        />

        {/* Attachment Icon + Filename */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <IconButton
            component="label"
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
            }}
          >
            <AttachFileIcon />
            <input
              type="file"
              accept="image/*,video/*"
              hidden
              onChange={handleFileChange}
            />
          </IconButton>
          {mediaFile ? (
            <Typography variant="body2">{mediaFile.name}</Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No file chosen
            </Typography>
          )}
        </Box>

        {/* Preview (Image or Video) */}
        {previewUrl && (
          <Box sx={{ mt: 2 }}>
            {mediaFile?.type.startsWith("video") ? (
              <video
                src={previewUrl}
                controls
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "300px" }}
              />
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        {/* Gradient Post Button */}
        <Button
          variant="contained"
          onClick={handleCreatePost}
          disabled={!postTitle.trim() && !postContent.trim() && !mediaFile}
          sx={{
            background: "linear-gradient(45deg, #4a90e2 30%, #50b3ff 90%)",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(45deg, #50b3ff 30%, #4a90e2 90%)",
            },
          }}
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostDialog;
