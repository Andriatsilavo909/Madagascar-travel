import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';

// Configuration temporaire pour SQLite
const sqlite = new PrismaClient({
  datasources: {
    db: {
      url: "file:./prisma/dev.db"
    }
  }
});

async function extractData() {
  console.log('📤 Extraction des données SQLite...\n');
  
  // Extraire les lieux
  const lieux = await sqlite.lieu.findMany();
  console.log(`📍 ${lieux.length} lieux trouvés`);
  fs.writeFileSync('data-lieux.json', JSON.stringify(lieux, null, 2));
  
  // Extraire les guides
  try {
    const guides = await sqlite.guide.findMany();
    console.log(`👤 ${guides.length} guides trouvés`);
    fs.writeFileSync('data-guides.json', JSON.stringify(guides, null, 2));
  } catch (e) {}
  
  // Extraire les utilisateurs
  const users = await sqlite.user.findMany();
  console.log(`👥 ${users.length} utilisateurs trouvés`);
  fs.writeFileSync('data-users.json', JSON.stringify(users, null, 2));
  
  console.log('\n✅ Extraction terminée ! Fichiers créés :');
  console.log('   - data-lieux.json');
  console.log('   - data-guides.json');
  console.log('   - data-users.json');
}

extractData()
  .catch(console.error)
  .finally(() => sqlite.$disconnect());