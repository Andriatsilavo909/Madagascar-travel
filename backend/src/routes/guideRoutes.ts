import { Router } from 'express';
import { getGuides, getGuideById, createGuide, updateGuide, deleteGuide } from '../controllers/guideController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getGuides);
router.get('/:id', getGuideById);
router.post('/', authMiddleware, adminMiddleware, createGuide);
router.put('/:id', authMiddleware, adminMiddleware, updateGuide);
router.delete('/:id', authMiddleware, adminMiddleware, deleteGuide);

export default router;