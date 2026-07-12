import { registerUser, login, logout, getUser } from '../controllers/user_controller.js';
import authMiddleware from '../middlewares/auth_middleware.js';
import express from 'express';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, getUser);

export default router;
