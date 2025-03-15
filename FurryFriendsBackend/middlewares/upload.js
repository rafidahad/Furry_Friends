import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

// ✅ Configure Cloudinary storage for Profile Pictures
const profilePictureStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "furry_friends/profile_pictures",
    allowed_formats: ["jpg", "png", "jpeg"],
    resource_type: "image",
  },
});

// ✅ Configure Cloudinary storage for General Images
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "furry_friends/images",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
    resource_type: "image",
  },
});

// ✅ Configure Cloudinary storage for Videos
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "furry_friends/videos",
    allowed_formats: ["mp4", "mov", "avi", "mkv"],
    resource_type: "video",
  },
});
const adoptionPetStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "furry_friends/adoption_pets", // folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    resource_type: "image",
  },
});

export const uploadAdoptionPetImage = multer({ storage: adoptionPetStorage });

// ✅ Export all upload configurations
export const uploadProfilePicture = multer({ storage: profilePictureStorage });
export const uploadImage = multer({ storage: imageStorage });
export const uploadVideo = multer({ storage: videoStorage });
