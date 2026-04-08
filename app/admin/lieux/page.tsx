import { prisma } from '@/lib/db/prisma'
import { parseImages } from '@/types/lieu'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2, Plus } from 'lucide-react'
import DeleteButton from '@/components/admin/DeleteButton'

async function getLieux() {
  const lieux = await prisma.lieu.findMany({
    include: { createdBy: { select: { name: true } } },
    orderBy: { createdAt: 'desc' }
  })
  return lieux.map(lieu => ({
    ...lieu,
    imagesArray: parseImages(lieu.images)
  }))
}

export default async function AdminLieuxPage() {
  const lieux = await getLieux()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des lieux</h1>
        <Link href="/admin/lieux/ajout">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un lieu
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Région
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Créé par
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lieux.map((lieu) => (
              <tr key={lieu.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {lieu.imagesArray && lieu.imagesArray.length > 0 ? (
                    <img
                      src={lieu.imagesArray[0]}
                      alt={lieu.nom}
                      className="h-10 w-10 rounded object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                      Pas d'image
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {lieu.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{lieu.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lieu.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {lieu.createdBy?.name || 'Inconnu'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Link href={`/admin/lieux/${lieu.id}/modifier`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteButton id={lieu.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}