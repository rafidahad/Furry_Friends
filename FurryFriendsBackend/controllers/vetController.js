// controllers/vetController.js
import Vet from "../model/vet.js";

/**
 * Get nearby vets based on user location
 */
export const getNearbyVets = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng) {
      return res
        .status(400)
        .json({ error: "Latitude and Longitude are required." });
    }

    // Convert lat/lng to float
    const userLocation = [parseFloat(lng), parseFloat(lat)];

    // Find nearby vets using geospatial query
    const vets = await Vet.find({
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: userLocation },
          $maxDistance: 10000, // 10km range (adjust as needed)
        },
      },
    });

    res.status(200).json(vets);
  } catch (error) {
    console.error("Error fetching nearby vets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
