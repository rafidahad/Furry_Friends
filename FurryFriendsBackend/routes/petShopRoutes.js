// routes/petShopRoutes.js
import express from "express";
import { getNearbyPetShops } from "../controllers/petShopController.js";

const router = express.Router();

// GET /petshops/nearby?lat=xx&lng=yy
router.get("/nearby", getNearbyPetShops);

export default router;
