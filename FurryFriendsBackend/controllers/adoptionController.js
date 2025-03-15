import AdoptionPet from "../model/adoptionPet.js";

/**
 * Add a New Pet for Adoption
 * POST /api/adoption
 */
export const addAdoptionPet = async (req, res) => {
  try {
    // Because we're using Multer + Cloudinary,
    // the uploaded file's Cloudinary URL is in `req.file.path`.
    // The rest of fields come from req.body
    const { name, type, age, location, reason, contactEmail, contactPhone } =
      req.body;

    const userId = req.user.id; // The ID of the currently logged-in user

    // If we used the Cloudinary storage config, the final image URL is at req.file.path
    let imageUrl = "";
    if (req.file && req.file.path) {
      imageUrl = req.file.path; // This is the Cloudinary URL
    }

    const newPet = new AdoptionPet({
      name,
      type,
      age,
      location,
      image: imageUrl,
      reason,
      contactEmail,
      contactPhone,
      createdBy: userId,
    });

    await newPet.save();

    return res.status(201).json({
      success: true,
      message: "Pet listed for adoption!",
      pet: newPet,
    });
  } catch (error) {
    console.error("Error listing pet:", error);
    res
      .status(500)
      .json({ success: false, message: "Error listing pet", error });
  }
};

// Get All Adoption Pets
export const getAllAdoptionPets = async (req, res) => {
  try {
    const pets = await AdoptionPet.find().populate(
      "createdBy",
      "username email"
    );
    res.status(200).json({ success: true, pets });
  } catch (error) {
    console.error("Error fetching pets:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching pets", error });
  }
};

// Get a Single Pet by ID
export const getAdoptionPetById = async (req, res) => {
  try {
    const pet = await AdoptionPet.findById(req.params.id).populate(
      "createdBy",
      "username email"
    );
    if (!pet)
      return res.status(404).json({ success: false, message: "Pet not found" });

    res.status(200).json({ success: true, pet });
  } catch (error) {
    console.error("Error fetching pet details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching pet details", error });
  }
};

// Delete a Pet Listing (Only Owner Can Delete)
export const deleteAdoptionPet = async (req, res) => {
  try {
    const pet = await AdoptionPet.findById(req.params.id);
    if (!pet)
      return res.status(404).json({ success: false, message: "Pet not found" });

    if (pet.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await pet.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Pet removed successfully" });
  } catch (error) {
    console.error("Error deleting pet:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting pet", error });
  }
};
