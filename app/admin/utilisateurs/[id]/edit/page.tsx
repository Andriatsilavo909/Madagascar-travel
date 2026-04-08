import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import EditUserForm from "@/components/admin/EditUserForm"

// Important : le type params est une Promise
interface PageProps {
  params: Promise<{ id: string }>
}

async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true }
  })
  return user
}

export default async function EditUserPage({ params }: PageProps) {
  // On attend la résolution de params pour obtenir l'id
  const { id } = await params
  const user = await getUser(id)

  if (!user) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier l'utilisateur</h1>
      <EditUserForm user={user} />
    </div>
  )
}