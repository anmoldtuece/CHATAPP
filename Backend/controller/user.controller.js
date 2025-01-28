import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";

export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword, profile_pic } = req.body;

  // Validate inputs
  if (!fullname || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      profile_pic,
    });

    await newUser.save();
    createTokenAndSaveCookie(newUser._id, res);

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profile_pic: newUser.profile_pic,
      },
    });
  } catch (error) {
    console.error("Error in signup Controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid user credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid user credentials" });
    }

    createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profile_pic: user.profile_pic,
      },
    });
  } catch (error) {
    console.error("Error in login Controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(400).json({ error: "No active session found" });
    }
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in logout Controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized access" });
    }

    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.error("Error in allUsers Controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
