import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import { parseImages } from '@/types/lieu'
import EditLieuForm from '@/components/admin/EditLieuForm'

async function getLieu(id: string) {
  const lieu = await prisma.lieu.findUnique({ where: { id } })
  if (!lieu) return null
  return {
    ...lieu,
    imagesArray: parseImages(lieu.images)
  }
}

interface PageProps {
  params: Promise<{ id: string }> | { id: string }
}

export default async function ModifierLieuPage({ params }: PageProps) {
  const { id } = await params
  const lieu = await getLieu(id)

  if (!lieu) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Modifier {lieu.nom}</h1>
      <EditLieuForm lieu={lieu} />
    </div>
  )
}