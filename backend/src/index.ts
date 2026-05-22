import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import lieuRoutes from './routes/lieuRoutes';
import authRoutes from './routes/authRoutes';
import guideRoutes from './routes/guideRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Route racine
app.get('/', (req: any, res: any) => {
  res.json({
    message: 'Bienvenue sur l\'API Madagascar Travel',
    version: '1.0.0',
    endpoints: {
      lieux: '/api/lieux',
      auth: '/api/auth',
      guides: '/api/guides',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

app.use('/api/lieux', lieuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/users', userRoutes);

app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'OK', message: 'Backend Madagascar Travel' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
});