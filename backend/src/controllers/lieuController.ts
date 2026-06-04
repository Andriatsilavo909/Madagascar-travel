import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createLieu = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log('📝 Données reçues:', data);

    const imagesJson = JSON.stringify(data.imagesArray || []);

    const lieu = await prisma.lieu.create({
      data: {
        nom: data.nom,
        region: data.region,
        description: data.description,
        type: data.type,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
        images: imagesJson,
        createdById: data.createdById || 'admin',
      }
    });

    res.status(201).json({
      ...lieu,
      imagesArray: JSON.parse(lieu.images || '[]')
    });
  } catch (error: any) {
    console.error('❌ Erreur createLieu:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getLieux = async (req: Request, res: Response) => {
  try {
    const lieux = await prisma.lieu.findMany();

    const lieuxWithImages = lieux.map(lieu => ({
      ...lieu,
      imagesArray: (() => {
        try { return JSON.parse(lieu.images || '[]'); }
        catch { return []; }
      })()
    }));

    res.json(lieuxWithImages);
  } catch (error: any) {
    console.error('Erreur getLieux:', error);
    res.status(500).json({ error: 'Erreur' });
  }
};

export const getLieuById = async (req: Request, res: Response) => {
  try {
    const lieu = await prisma.lieu.findUnique({
      where: { id: req.params.id }
    });
    if (!lieu) return res.status(404).json({ error: 'Lieu non trouvé' });

    res.json({
      ...lieu,
      imagesArray: (() => {
        try { return JSON.parse(lieu.images || '[]'); }
        catch { return []; }
      })()
    });
  } catch (error: any) {
    console.error('Erreur getLieuById:', error);
    res.status(500).json({ error: 'Erreur' });
  }
};

export const updateLieu = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const imagesJson = JSON.stringify(data.imagesArray || []);

    const lieu = await prisma.lieu.update({
      where: { id: req.params.id },
      data: {
        nom: data.nom,
        region: data.region,
        description: data.description,
        type: data.type,
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
        images: imagesJson,
      }
    });

    res.json({
      ...lieu,
      imagesArray: JSON.parse(lieu.images || '[]')
    });
  } catch (error: any) {
    console.error('❌ Erreur updateLieu:', error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteLieu = async (req: Request, res: Response) => {
  try {
    await prisma.lieu.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Lieu supprimé' });
  } catch (error: any) {
    console.error('❌ Erreur deleteLieu:', error);
    res.status(500).json({ error: error.message });
  }
};