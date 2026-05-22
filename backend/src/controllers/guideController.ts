import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getGuides = async (req: Request, res: Response) => {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(guides);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
};

export const getGuideById = async (req: Request, res: Response) => {
  try {
    const guide = await prisma.guide.findUnique({
      where: { id: req.params.id }
    });
    if (!guide) return res.status(404).json({ error: 'Guide non trouvé' });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createGuide = async (req: Request, res: Response) => {
  try {
    const guide = await prisma.guide.create({
      data: req.body
    });
    res.status(201).json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création' });
  }
};

export const updateGuide = async (req: Request, res: Response) => {
  try {
    const guide = await prisma.guide.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

export const deleteGuide = async (req: Request, res: Response) => {
  try {
    await prisma.guide.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};