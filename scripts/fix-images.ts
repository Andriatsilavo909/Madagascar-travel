import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const lieux = await prisma.lieu.findMany()

  for (const lieu of lieux) {
    const original = lieu.images
    let fixed = original

    // Si la chaîne commence par [ et finit par ], mais que les éléments ne sont pas entre guillemets
    // Exemple: [https://... , https://...] → convertir en ["https://...", "https://..."]
    if (original.startsWith('[') && original.endsWith(']')) {
      // Extraire le contenu entre crochets et le splitter par virgule
      const inner = original.slice(1, -1).trim()
      if (inner) {
        const parts = inner.split(',').map(s => s.trim())
        // Ajouter des guillemets autour de chaque partie
        const quoted = parts.map(p => `"${p}"`).join(', ')
        fixed = `[${quoted}]`
      } else {
        fixed = '[]'
      }
    }
    // Si c'est une simple URL sans crochets
    else if (original.startsWith('http')) {
      fixed = `["${original}"]`
    }

    // Vérifier si le JSON est valide
    try {
      JSON.parse(fixed)
    } catch (e) {
      console.error(`Impossible de corriger ${lieu.nom} (${lieu.id}) : ${fixed}`)
      continue
    }

    if (fixed !== original) {
      await prisma.lieu.update({
        where: { id: lieu.id },
        data: { images: fixed }
      })
      console.log(`✅ ${lieu.nom} corrigé : ${fixed}`)
    } else {
      console.log(`✔️ ${lieu.nom} déjà correct`)
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())