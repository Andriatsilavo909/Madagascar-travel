import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, phone, role } = req.body;
    
    console.log('📝 Tentative inscription:', { email, name });

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, mot de passe et nom requis' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé' });
    }

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    console.log('🔐 Mot de passe haché avec succès');

    const user = await prisma.user.create({
      data: { 
        email, 
        password: hashedPassword, 
        name, 
        phone: phone || null,
        role: role || 'CLIENT' 
      }
    });
    
    console.log('✅ Utilisateur créé:', user.id);
    
    res.status(201).json({ 
      message: 'Utilisateur créé', 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error) {
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
      console.log('❌ Utilisateur non trouvé');
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    const isValid = await bcrypt.compare(password, user.password);
    console.log('🔑 Mot de passe valide:', isValid);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET || 'secret', 
      { expiresIn: '7d' }
    );
    
    console.log('✅ Connexion réussie:', email);
    
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, name: user.name, role: user.role } 
    });
  } catch (error) {
    console.error('❌ Erreur connexion:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};