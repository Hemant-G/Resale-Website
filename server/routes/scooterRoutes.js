import express from "express";
import { getScooters, createScooter, getScooterById, updateScooter, deleteScooter } from "../controllers/scooterController.js";
import passport from "../config/passport.config.js";

const router = express.Router();

router.get("/", getScooters);
router.get("/:id", getScooterById);

// Protected routes (require authentication)
router.post("/", passport.authenticate('jwt', { session: false }), createScooter);
router.put("/:id", passport.authenticate('jwt', { session: false }), updateScooter);
router.delete("/:id", passport.authenticate('jwt', { session: false }), deleteScooter);

export default router;