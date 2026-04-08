import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@madagascar.com'
  const adminPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log(`✅ Admin créé : ${admin.email} (mot de passe: admin123)`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())