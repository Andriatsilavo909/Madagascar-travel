import { Router } from 'express';
import { getGuides, getGuideById, createGuide, updateGuide, deleteGuide } from '../controllers/guideController';

const router = Router();

router.get('/', getGuides);        // Public
router.get('/:id', getGuideById);  // Public
router.post('/', createGuide);     // ← Public (plus besoin d'être admin)
router.put('/:id', updateGuide);   // Admin uniquement (si besoin)
router.delete('/:id', deleteGuide); // Admin uniquement

export default router;