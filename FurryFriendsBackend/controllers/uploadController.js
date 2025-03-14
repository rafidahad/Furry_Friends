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

// -------------------- Helper Function --------------------

/**
 * Extracts the Cloudinary public_id from a given URL.
 * For example, given:
 * https://res.cloudinary.com/<cloud_name>/image/upload/v1600000000/folder/filename.ext
 * it returns: folder/filename
 */
export const extractPublicIdFromUrl = (url) => {
  try {
    const parts = url.split("/");
    // Find the "upload" segment
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return null;
    // Everything after "upload" is version and public_id segments.
    let publicIdParts = parts.slice(uploadIndex + 1);
    // Remove version if present (e.g., v1600000000)
    if (
      publicIdParts[0].startsWith("v") &&
      !isNaN(publicIdParts[0].substring(1))
    ) {
      publicIdParts = publicIdParts.slice(1);
    }
    // Join remaining parts to get the public_id with extension
    const publicIdWithExtension = publicIdParts.join("/");
    // Remove file extension from the last part
    const lastDotIndex = publicIdWithExtension.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      return publicIdWithExtension.substring(0, lastDotIndex);
    }
    return publicIdWithExtension;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};
