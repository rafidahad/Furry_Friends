import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({ error: "Unauthorized: No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.locals.user = decoded; // ✅ Store user info for frontend
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token is invalid or expired." });
  }
};
