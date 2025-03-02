// controllers/userControllers.js
import User from "../model/user.js";
import bcrypt from "bcrypt";

// CREATE a new user (for signup)
export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      surname,
      emailOrPhone,
      password,
      day,
      month,
      year,
      gender,
      location, // optional
      bio, // optional
      profilePicture, // optional
    } = req.body;

    // Check if a user with the same email/phone already exists
    const existingUser = await User.findOne({ emailOrPhone });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      surname,
      emailOrPhone,
      passwordHash,
      profile: {
        dob: {
          day: Number(day),
          month,
          year: Number(year),
        },
        gender,
        location: location || "",
        bio: bio || "",
        profilePicture: profilePicture || "",
      },
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// READ all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// READ a single user by id
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE a user by id
export const updateUser = async (req, res) => {
  try {
    const {
      firstName,
      surname,
      emailOrPhone,
      password, // if provided, should be rehashed
      day,
      month,
      year,
      gender,
      location,
      bio,
      profilePicture,
    } = req.body;

    const updateData = {
      firstName,
      surname,
      emailOrPhone,
      profile: {
        dob: {
          day: Number(day),
          month,
          year: Number(year),
        },
        gender,
        location: location || "",
        bio: bio || "",
        profilePicture: profilePicture || "",
      },
    };

    // If password is provided, hash it and update passwordHash field
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.passwordHash = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a user by id
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
