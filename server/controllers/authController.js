import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { fullName, bio, profilePic } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id, 
      { fullName, bio, profilePic }, 
      { new: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {};
export const register = async (req, res) => {};
export const checkAuth = async (req, res) => {};
