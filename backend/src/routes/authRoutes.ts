import { Router } from 'express';
import { register, login, googleAuth } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth); // ← nouvelle route pour Google OAuth

export default router;