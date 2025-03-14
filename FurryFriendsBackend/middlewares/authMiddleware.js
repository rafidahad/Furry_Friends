import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.js";

dotenv.config();

/**
 * ✅ Middleware to protect routes (Authenticate users)
 */
export const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // ✅ Extract token

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No token provided." });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-passwordHash"); // Fetch user from DB

    if (!req.user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User does not exist." });
    }

    res.locals.user = req.user; // ✅ Store user info for frontend use
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session expired. Please log in again." });
    }

    return res.status(401).json({ error: "Token is invalid or expired." });
  }
};
