import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const secureRoute = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ error: "Invalid or malformed token" });
    }

    // Fetch the user from the database
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user object to the request
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in secureRoute middleware:", error.message || error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default secureRoute;
