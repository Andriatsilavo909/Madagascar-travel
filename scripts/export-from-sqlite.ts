import { PrismaClient as PrismaSQLite } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

// Configuration pour SQLite (base originale)
const sqlite = new PrismaSQLite({
  datasources: {
    db: {
      url: "file:./dev.db"
    }
  }
});

const postgres = new PrismaClient();

async function exportData() {
  console.log('📤 Export des données SQLite vers PostgreSQL...\n');
  
  // Exporter les lieux
  const lieux = await sqlite.lieu.findMany();
  console.log(`📍 ${lieux.length} lieux trouvés dans SQLite`);
  
  for (const lieu of lieux) {
    await postgres.lieu.create({
      data: {
        id: lieu.id,
        nom: lieu.nom,
        region: lieu.region,
        description: lieu.description,
        images: lieu.images,
        lat: lieu.lat,
        lng: lieu.lng,
        type: lieu.type,
        createdById: lieu.createdById,
        createdAt: lieu.createdAt,
        updatedAt: lieu.updatedAt,
      }
    });
    console.log(`  ✅ ${lieu.nom}`);
  }
  
  // Exporter les guides
  const guides = await sqlite.guide.findMany();
  console.log(`\n👤 ${guides.length} guides trouvés dans SQLite`);
  
  for (const guide of guides) {
    await postgres.guide.create({
      data: {
        id: guide.id,
        userId: guide.userId,
        nom: guide.nom,
        prenom: guide.prenom,
        telephone: guide.telephone,
        specialite: guide.specialite,
        description: guide.description,
        status: guide.status,
        createdAt: guide.createdAt,
        updatedAt: guide.updatedAt,
      }
    });
    console.log(`  ✅ ${guide.prenom} ${guide.nom}`);
  }
  
  console.log('\n🎉 Export terminé !');
}

exportData()
  .catch(console.error)
  .finally(() => {
    sqlite.$disconnect();
    postgres.$disconnect();
  });