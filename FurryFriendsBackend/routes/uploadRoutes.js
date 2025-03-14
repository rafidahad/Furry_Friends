import express from "express";
import {
  uploadImage,
  uploadVideo,
  uploadProfilePicture,
} from "../middlewares/upload.js";
import {
  uploadProfilePictureController,
  uploadImageController,
  uploadVideoController,
} from "../controllers/uploadController.js";

const router = express.Router();

/**
 * ✅ Upload Profile Picture to Cloudinary
 * @route   POST /upload/profile-picture
 */
router.post(
  "/profile-picture",
  uploadProfilePicture.single("file"),
  uploadProfilePictureController
);

/**
 * ✅ Upload Image to Cloudinary
 * @route   POST /upload/image
 */
router.post("/image", uploadImage.single("file"), uploadImageController);

/**
 * ✅ Upload Video to Cloudinary
 * @route   POST /upload/video
 */
router.post("/video", uploadVideo.single("file"), uploadVideoController);

export default router;
