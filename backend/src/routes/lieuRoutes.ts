import { Router } from 'express';
import { getLieux, getLieuById, createLieu, updateLieu, deleteLieu } from '../controllers/lieuController';

const router = Router();

// Routes publiques (pas de vérification d'authentification)
router.get('/', getLieux);
router.get('/:id', getLieuById);
router.post('/', createLieu);  // ← Plus de authMiddleware
router.put('/:id', updateLieu); // ← Plus de authMiddleware
router.delete('/:id', deleteLieu); // ← Plus de authMiddleware

export default router;