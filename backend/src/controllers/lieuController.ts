import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLieux = async (req: Request, res: Response) => {
  try {
    const lieux = await prisma.lieu.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(lieux);
  } catch (error) {
    console.error('Erreur getLieux:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
};

export const getLieuById = async (req: Request, res: Response) => {
  try {
    const lieu = await prisma.lieu.findUnique({
      where: { id: req.params.id }
    });
    if (!lieu) return res.status(404).json({ error: 'Lieu non trouvé' });
    res.json(lieu);
  } catch (error) {
    console.error('Erreur getLieuById:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createLieu = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log('📝 Données reçues:', data);
    
    // Convertir imagesArray en JSON string si présent
    if (data.imagesArray) {
      data.images = JSON.stringify(data.imagesArray);
      delete data.imagesArray;
    }
    
    // Utilisation de @ts-ignore pour contourner les vérifications TypeScript
    // @ts-ignore
    const lieu = await prisma.lieu.create({
      data: data
    });
    
    console.log('✅ Lieu créé:', lieu.id);
    res.status(201).json(lieu);
  } catch (error) {
    console.error('❌ Erreur createLieu:', error);
    res.status(500).json({ error: 'Erreur lors de la création: ' + error.message });
  }
};

export const updateLieu = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    if (data.imagesArray) {
      data.images = JSON.stringify(data.imagesArray);
      delete data.imagesArray;
    }
    
    // @ts-ignore
    const lieu = await prisma.lieu.update({
      where: { id: req.params.id },
      data: data
    });
    res.json(lieu);
  } catch (error) {
    console.error('Erreur updateLieu:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

export const deleteLieu = async (req: Request, res: Response) => {
  try {
    await prisma.lieu.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error) {
    console.error('Erreur deleteLieu:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};