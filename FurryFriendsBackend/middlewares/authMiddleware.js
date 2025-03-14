import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user.js";

dotenv.config();

/**
 * ✅ Middleware to protect routes (Authenticate users)
 */
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ✅ Ensure authorization header is present
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user from DB and exclude password
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized: User does not exist." });
    }

    req.user = user; // Attach user to request
    res.locals.user = user; // ✅ Store user info for frontend use

    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Session expired. Please log in again." });
    }

    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
