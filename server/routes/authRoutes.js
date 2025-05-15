import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/authController.js';
import { getScooterBySellerId } from '../controllers/scooterController.js';
import passport from "../config/passport.config.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes requiring authentication
router.get('/profile', passport.authenticate('jwt', { session: false }), getUserProfile);
router.get("/me/scooters", passport.authenticate('jwt', { session: false }), getScooterBySellerId)
router.put('/profile', passport.authenticate('jwt', { session: false }), updateUserProfile);



export default router;