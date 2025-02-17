import express from "express";
import verifyJwt from "../middlewares/auth.middleware.js";
import {
  createMatchRound,
  getRoundes
} from "../controllers/match.controller.js";
const router = express.Router();

router.post("/create-round", verifyJwt, createMatchRound);
router.get("/get-roundes", verifyJwt, getRoundes);
export default router;
