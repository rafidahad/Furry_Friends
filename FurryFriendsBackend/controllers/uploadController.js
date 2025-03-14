import { v2 as cloudinary } from "cloudinary";

/**
 * ✅ Upload Profile Picture to Cloudinary
 * @route   POST /upload/profile-picture
 */
export const uploadProfilePictureController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    console.log("Profile picture uploaded:", req.file);
    res.status(200).json({ url: req.file.path }); // ✅ Return Cloudinary URL
  } catch (error) {
    console.error("Profile Picture Upload Error:", error);
    res.status(500).json({ error: "Profile picture upload failed." });
  }
};

/**
 * ✅ Upload Image (General) to Cloudinary
 * @route   POST /upload/image
 */
export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    console.log("Image uploaded:", req.file);
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    console.error("Image Upload Error:", error);
    res.status(500).json({ error: "Image upload failed." });
  }
};
export const handleProfilePictureUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to upload profile picture." });
  }
};

/**
 * ✅ Upload Video to Cloudinary
 * @route   POST /upload/video
 */
export const uploadVideoController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    console.log("Video uploaded:", req.file);
    res.status(200).json({ url: req.file.path });
  } catch (error) {
    console.error("Video Upload Error:", error);
    res.status(500).json({ error: "Video upload failed." });
  }
};
