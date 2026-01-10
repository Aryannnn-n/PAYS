import { Router } from 'express';
import { getBalance, transfer } from '../controllers/account.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Get Balance
router.get('/balance', authMiddleware, getBalance);
router.post('/transfer', authMiddleware, transfer);

export default router;
