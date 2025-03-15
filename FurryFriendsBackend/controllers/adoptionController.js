// controllers/adoptionController.js
import AdoptionPet from "../model/adoptionPet.js";

// -- Create a new listing
export const addAdoptionPet = async (req, res) => {
  try {
    const {
      name,
      type,
      age,
      location,
      image,
      reason,
      contactEmail,
      contactPhone,
    } = req.body;

    const userId = req.user.id; // from JWT

    const newPet = new AdoptionPet({
      name,
      type,
      age,
      location,
      image,
      reason,
      contactEmail,
      contactPhone,
      createdBy: userId,
      status: "Available",
    });

    await newPet.save();
    res.status(201).json({
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

// -- Fetch all listings
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

// -- Fetch single listing by ID
export const getAdoptionPetById = async (req, res) => {
  try {
    const pet = await AdoptionPet.findById(req.params.id).populate(
      "createdBy",
      "username email"
    );
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }
    res.status(200).json({ success: true, pet });
  } catch (error) {
    console.error("Error fetching pet details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching pet details", error });
  }
};

// -- Mark as Adopted (instead of deleting)
export const markPetAsAdopted = async (req, res) => {
  try {
    const pet = await AdoptionPet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    // Only the user who created the listing can mark it as adopted
    if (pet.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Update the status
    pet.status = "Adopted";
    await pet.save();

    res
      .status(200)
      .json({ success: true, message: "Pet marked as adopted", pet });
  } catch (error) {
    console.error("Error marking as adopted:", error);
    res
      .status(500)
      .json({ success: false, message: "Error marking as adopted", error });
  }
};

// -- Delete listing entirely
export const deleteAdoptionPet = async (req, res) => {
  try {
    const pet = await AdoptionPet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    if (pet.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    // Remove from DB
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
