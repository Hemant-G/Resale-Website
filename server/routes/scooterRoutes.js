import express from "express";
 import { getScooters, createScooter, getScooterById, updateScooter, deleteScooter } from "../controllers/scooterController.js";
 import passport from "../config/passport.config.js";
 import multer from 'multer';

 const router = express.Router();
 const storage = multer.memoryStorage();
 const upload = multer({ storage: storage });

 router.get("/", getScooters);
 router.get("/:id", getScooterById);

 // Protected routes (require authentication)
 router.post("/", passport.authenticate('jwt', { session: false }), upload.fields([
  { name: 'rcFile', maxCount: 1 },
  { name: 'purchaseBillFile', maxCount: 1 },
  { name: 'images', maxCount: 4 }
 ]), createScooter);

 router.put("/:id", passport.authenticate('jwt', { session: false }), updateScooter);
 router.delete("/:id", passport.authenticate('jwt', { session: false }), deleteScooter);

 export default router;