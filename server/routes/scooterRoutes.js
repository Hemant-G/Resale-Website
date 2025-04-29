import express from "express";
import { getScooters, createScooter, getScooterById, updateScooter, deleteScooter } from "../controllers/scooterController.js";

const router = express.Router();

router.get("/", getScooters);
router.post("/", createScooter);
router.get("/:id", getScooterById);
router.put("/:id", updateScooter);
router.delete("/:id", deleteScooter);
export default router;