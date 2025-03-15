// controllers/petShopController.js
import PetShop from "../model/petShop.js";

/**
 * GET /petshops/nearby?lat=xx&lng=yy
 * Returns pet shops near the user location (lat/lng) within some max distance
 */
export const getNearbyPetShops = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ error: "Latitude & Longitude required." });
    }
    const userLocation = [parseFloat(lng), parseFloat(lat)];

    // Example: search within 10 km (10000 meters)
    const petShops = await PetShop.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: userLocation },
          $maxDistance: 10000,
        },
      },
    });

    res.status(200).json(petShops);
  } catch (error) {
    console.error("Error fetching nearby pet shops:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
