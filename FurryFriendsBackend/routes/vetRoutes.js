import express from "express";
import { getNearbyVets } from "../controllers/vetController.js";

const router = express.Router();

// ✅ Fetch nearby vet clinics (GET /vets/nearby?lat=xx&lng=yy)
router.get("/nearby", getNearbyVets);

export default router;
