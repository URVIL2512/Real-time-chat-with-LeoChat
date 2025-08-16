// import express from 'express';
// import { login, signup, updateProfile, checkAuth } from '../controllers/userController.js';
// import { protectRoute } from '../middleware/auth.js';

// const userRouter = express.Router();

// userRouter.post('/signup', signup);
// userRouter.post('/login', login);
// userRouter.put('/updateProfile', protectRoute, updateProfile);
// userRouter.get('/check-auth', protectRoute, checkAuth);

// export default userRouter;


import express from "express";
import { signup, login, updateProfile, checkAuth } from "../controllers/userController.js";
import { protectRoute } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check-auth", protectRoute, checkAuth);

export default router;
