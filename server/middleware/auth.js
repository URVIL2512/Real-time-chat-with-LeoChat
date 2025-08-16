// import User from "../models/User.js";
// import jwt from 'jsonwebtoken';

// export const protectRoute = async (req, res, next) => {
//     try {
//         const token = req.headers.token;
//         if (!token) {
//             return res.json({ success: false, message: "No token provided" });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const existingUser = await User.findById(decoded.userId).select("-password");

//         if (!existingUser) {
//             return res.json({ success: false, message: "User not found" });
//         }

//         req.user = existingUser;
//         next();
//     } catch (error) {
//         console.error(error.message);
//         res.json({ success: false, message: error.message });
//     }
// };

// export const checkAuth = (req, res) => {
//     res.json({ success: true, user: req.user });
// };




import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
