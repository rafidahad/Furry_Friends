import express from "express";
import {
  uploadImage,
  uploadVideo,
  uploadProfilePicture,
} from "../middlewares/upload.js";
import { handleProfilePictureUpload } from "../controllers/uploadController.js";

const router = express.Router();

/**
 * ✅ Upload an image to Cloudinary
 * @route   POST /upload/image
 */
router.post(
  "/profile-picture",
  uploadProfilePicture.single("file"),
  handleProfilePictureUpload
);

router.post("/image", uploadImage.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded." });
  }
  res.status(200).json({ url: req.file.path }); // ✅ Return Cloudinary image URL
});

/**
 * ✅ Upload a video to Cloudinary
 * @route   POST /upload/video
 */
router.post("/video", uploadVideo.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No video uploaded." });
  }
  res.status(200).json({ url: req.file.path }); // ✅ Return Cloudinary video URL
});

export default router;
