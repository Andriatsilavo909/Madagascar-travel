import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, role, adminKey } = req.body;
    console.log('📝 Tentative inscription:', { email, name, role });

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, mot de passe et nom requis' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let assignedRole = 'CLIENT';
    if (adminKey && adminKey === process.env.ADMIN_SECRET_KEY) {
      assignedRole = 'ADMIN';
    } else if (role === 'GUIDE') {
      assignedRole = 'GUIDE';
    }

    console.log('👑 Rôle attribué:', assignedRole);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, phone: phone || null, role: assignedRole }
    });

    console.log('✅ Utilisateur créé:', user.id, 'avec rôle:', user.role);
    res.status(201).json({
      message: 'Utilisateur créé',
      user: { id: user.id, email: user.email, name: user.name, role: user.role }
    });
  } catch (error: any) {
    console.error('❌ Erreur inscription:', error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription: ' + error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log('🔐 Tentative connexion:', email);

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    console.log('✅ Connexion réussie:', email, '| Rôle:', user.role);
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    console.error('❌ Erreur connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// ── Connexion via Google OAuth ─────────────────────────────────────────────
export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { email, name, googleId } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email requis' });
    }

    // Cherche l'utilisateur existant
    let user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      // Utilisateur existant — on retourne ses infos
      console.log('✅ Utilisateur Google existant:', email, '| Rôle:', user.role);
      return res.json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }

    // Nouvel utilisateur via Google — création automatique
    user = await prisma.user.create({
      data: {
        email,
        name: name || email.split('@')[0],
        password: null, // pas de mot de passe pour les comptes Google
        role: 'CLIENT',
      }
    });

    console.log('✅ Nouvel utilisateur Google créé:', email);
    res.status(201).json({ user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    console.error('❌ Erreur Google auth:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};