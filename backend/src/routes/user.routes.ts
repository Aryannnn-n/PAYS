import { Router } from 'express';
import {
  signin,
  signup,
  updateProfile,
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Sign Up Route
router.post('/signup', signup);

// Sign In Route
router.post('/signin', signin);

// Profile Update
router.patch('/update/profile', authMiddleware, updateProfile);

export default router;
