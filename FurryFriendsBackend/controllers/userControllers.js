import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/**
 * ✅ CREATE a new user (Signup)
 * @route   POST /auth/signup
 */
export const createUser = async (req, res) => {
  try {
    const {
      firstName,
      surname,
      email,
      password,
      day,
      month,
      year,
      gender,
      location,
      bio,
      profilePicture,
    } = req.body;

    // Check if user with this email exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res
        .status(400)
        .json({ error: "User with this email already exists." });

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      surname,
      email,
      passwordHash,
      profile: {
        dob: { day: Number(day), month, year: Number(year) },
        gender,
        location: location || "",
        bio: bio || "",
        profilePicture: profilePicture || "",
      },
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful! Please login." });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * ✅ LOGIN (Authenticate User & Generate JWT)
 * @route   POST /auth/login
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "Invalid email or password." });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password." });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        surname: user.surname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * ✅ GET User Profile with Followers & Posts Count
 * @route   GET /auth/profile
 */
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-passwordHash")
      .populate("followers", "username profile.profilePicture")
      .populate("following", "username profile.profilePicture");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .populate("followers", "username profile.profilePicture")
      .populate("following", "username profile.profilePicture");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ✅ Toggle Follow/Unfollow User
 * @route   POST /auth/follow/:id
 */
export const toggleFollow = async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);
    if (!userToFollow || !currentUser)
      return res.status(404).json({ message: "User not found" });
    const isFollowing = currentUser.following.includes(userToFollow._id);
    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== userToFollow._id.toString()
      );
      userToFollow.followers = userToFollow.followers.filter(
        (id) => id.toString() !== currentUser._id.toString()
      );
    } else {
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }
    await currentUser.save();
    await userToFollow.save();
    res.status(200).json({
      message: isFollowing
        ? "Unfollowed successfully."
        : "Followed successfully.",
      following: currentUser.following,
    });
  } catch (error) {
    console.error("Follow Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * ✅ UPDATE User Profile
 * @route   PUT /auth/profile
 */
export const updateUser = async (req, res) => {
  try {
    console.log("Profile Update Request:", req.body);

    const { username, bio, profilePicture, gender, dob } = req.body;

    // ✅ Ensure profile data is updated correctly
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        username,
        $set: {
          "profile.bio": bio,
          "profile.profilePicture": profilePicture,
          "profile.gender": gender,
          "profile.dob": dob,
        },
      },
      { new: true, runValidators: true }
    ).select("-passwordHash");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    console.log("Updated User Data:", updatedUser);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



/**
 * ✅ DELETE User Account
 * @route   DELETE /auth/profile
 */
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete Profile Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * ✅ FOLLOW/UNFOLLOW USER
 * @route   POST /auth/follow/:userId
 */
export const followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    if (userId === currentUserId)
      return res.status(400).json({ error: "You cannot follow yourself." });

    const userToFollow = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow || !currentUser)
      return res.status(404).json({ error: "User not found." });

    if (!userToFollow.followers.includes(currentUserId)) {
      userToFollow.followers.push(currentUserId);
      currentUser.following.push(userId);
      await userToFollow.save();
      await currentUser.save();
      return res.status(200).json({ message: "Followed successfully." });
    }

    userToFollow.followers = userToFollow.followers.filter(
      (id) => id.toString() !== currentUserId
    );
    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== userId
    );
    await userToFollow.save();
    await currentUser.save();

    res.status(200).json({ message: "Unfollowed successfully." });
  } catch (error) {
    console.error("Follow Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
