import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateLieux() {
  console.log('📝 Migration des lieux...');
  
  const lieux = await prisma.lieu.findMany();
  console.log(`🔄 ${lieux.length} lieux trouvés`);
  
  for (const lieu of lieux) {
    // Créer la traduction française (originale)
    await prisma.lieuTraduction.upsert({
      where: { lieuId_locale: { lieuId: lieu.id, locale: 'fr' } },
      update: {
        nom: lieu.nom,
        description: lieu.description,
      },
      create: {
        lieuId: lieu.id,
        locale: 'fr',
        nom: lieu.nom,
        description: lieu.description,
      },
    });
    console.log(`  ✅ ${lieu.nom} (fr)`);
  }
  console.log('✅ Migration des lieux terminée\n');
}

async function migrateGuides() {
  console.log('📝 Migration des guides...');
  
  const guides = await prisma.guide.findMany();
  console.log(`🔄 ${guides.length} guides trouvés`);
  
  for (const guide of guides) {
    // Créer la traduction française (originale)
    await prisma.guideTraduction.upsert({
      where: { guideId_locale: { guideId: guide.id, locale: 'fr' } },
      update: {
        nom: guide.nom,
        prenom: guide.prenom,
        specialite: guide.specialite,
        description: guide.description || "",
      },
      create: {
        guideId: guide.id,
        locale: 'fr',
        nom: guide.nom,
        prenom: guide.prenom,
        specialite: guide.specialite,
        description: guide.description || "",
      },
    });
    console.log(`  ✅ ${guide.prenom} ${guide.nom} (fr)`);
  }
  console.log('✅ Migration des guides terminée\n');
}

async function main() {
  console.log('🚀 Début de la migration multilingue...\n');
  
  await migrateLieux();
  await migrateGuides();
  
  console.log('🎉 Migration multilingue terminée avec succès !');
}

main()
  .catch((error) => {
    console.error('❌ Erreur:', error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());