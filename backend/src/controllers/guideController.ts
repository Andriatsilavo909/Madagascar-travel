import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createGuide = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log('📝 Données reçues:', data);

    const guide = await prisma.guide.create({
      data: {
        userId: data.userId || 'public',
        nom: data.nom || '',
        prenom: data.prenom || '',
        telephone: data.telephone || '',
        email: data.email || null,
        adresse: data.adresse || null,
        circuit: data.circuit || null,
        experience: data.experience || null,
        specialite: data.specialite || '',
        description: data.description || null,
        status: 'actif',
      }
    });

    res.status(201).json(guide);
  } catch (error: any) {
    console.error('❌ Erreur:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getGuides = async (req: Request, res: Response) => {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(guides);
  } catch (error: any) {
    console.error('Erreur getGuides:', error);
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
  } catch (error: any) {
    console.error('Erreur getGuideById:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const updateGuide = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const updateData: any = {};
    if (data.nom !== undefined) updateData.nom = data.nom;
    if (data.prenom !== undefined) updateData.prenom = data.prenom;
    if (data.telephone !== undefined) updateData.telephone = data.telephone;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.adresse !== undefined) updateData.adresse = data.adresse;
    if (data.circuit !== undefined) updateData.circuit = data.circuit;
    if (data.experience !== undefined) updateData.experience = data.experience;
    if (data.specialite !== undefined) updateData.specialite = data.specialite;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.status !== undefined) updateData.status = data.status;

    const guide = await prisma.guide.update({
      where: { id: req.params.id },
      data: updateData
    });
    res.json(guide);
  } catch (error: any) {
    console.error('Erreur updateGuide:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

export const deleteGuide = async (req: Request, res: Response) => {
  try {
    await prisma.guide.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (error: any) {
    console.error('Erreur deleteGuide:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};