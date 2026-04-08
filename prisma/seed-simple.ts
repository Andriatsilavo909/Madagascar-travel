import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Début du seed...')
  
  // Créer un admin
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@madagascar.com' },
    update: {},
    create: {
      email: 'admin@madagascar.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin créé:', admin.id)

  // Supprimer les anciens lieux
  await prisma.lieu.deleteMany({})
  console.log('✅ Anciens lieux supprimés')

  // Ajouter des lieux
  const lieux = [
    {
      nom: 'Rova d\'Antananarivo',
      region: 'ANTANANARIVO',
      description: 'Palais royal historique situé sur la colline d\'Analamanga, symbole de la monarchie merina.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400']),
      lat: -18.9237,
      lng: 47.5327,
      type: 'CULTUREL',
      createdById: admin.id,
    },
    {
      nom: 'Allée des Baobabs',
      region: 'TOLIARA',
      description: 'Célèbre groupe d\'arbres baobabs bordant une route de terre, l\'un des sites les plus photographiés de Madagascar.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400']),
      lat: -20.2508,
      lng: 44.4184,
      type: 'PARC',
      createdById: admin.id,
    },
    {
      nom: 'Tsingy de Bemaraha',
      region: 'MAHAJANGA',
      description: 'Réserve naturelle unique avec des formations karstiques spectaculaires, classée au patrimoine mondial de l\'UNESCO.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1590523278191-9edc9a3edfe3?w=400']),
      lat: -18.6667,
      lng: 44.75,
      type: 'PARC',
      createdById: admin.id,
    },
    {
      nom: 'Nosy Be',
      region: 'ANTSIRANANA',
      description: 'Île paradisiaque avec des plages magnifiques, eaux turquoises et une biodiversité exceptionnelle.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400']),
      lat: -13.3125,
      lng: 48.2667,
      type: 'PLAGE',
      createdById: admin.id,
    },
    {
      nom: 'Parc National d\'Isalo',
      region: 'FIANARANTSOA',
      description: 'Massif de grès sculpté par l\'érosion, canyons, piscines naturelles et une faune unique.',
      images: JSON.stringify(['https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=400']),
      lat: -22.4167,
      lng: 45.2,
      type: 'MONTAGNE',
      createdById: admin.id,
    }
  ]

  for (const lieu of lieux) {
    const result = await prisma.lieu.create({
      data: lieu
    })
    console.log(`✅ Lieu créé: ${result.nom}`)
  }

  console.log('🎉 Seed terminé avec succès!')
}

main()
  .catch((e) => {
    console.error('❌ Erreur:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })