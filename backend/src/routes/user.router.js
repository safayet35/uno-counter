import express from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  authCheck
} from "../controllers/user.controller.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJwt, logoutUser);
router.get("/auth-check", verifyJwt, authCheck);
export default router;
