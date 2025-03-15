import express from "express";
import {
  addAdoptionPet,
  getAllAdoptionPets,
  getAdoptionPetById,
  deleteAdoptionPet,
} from "../controllers/adoptionController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadAdoptionPetImage } from "../middlewares/upload.js";

const router = express.Router();

// POST /api/adoption
router.post(
  "/",
  protect,
  uploadAdoptionPetImage.single("image"), // "image" must match the field name from the frontend
  addAdoptionPet
);

// GET /api/adoption
router.get("/", getAllAdoptionPets);

// GET /api/adoption/:id
router.get("/:id", getAdoptionPetById);

// DELETE /api/adoption/:id
router.delete("/:id", protect, deleteAdoptionPet);

export default router;
