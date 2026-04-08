import { prisma } from '@/lib/db/prisma'
import { parseImages } from '@/types/lieu'
import { Suspense } from 'react'
import DynamicMap from '@/components/map/DynamicMap'

async function getAllLieux() {
  const lieux = await prisma.lieu.findMany()
  return lieux.map(lieu => ({
    ...lieu,
    imagesArray: parseImages(lieu.images)
  }))
}

export default async function PlanPage() {
  const lieux = await getAllLieux()

  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-4">Carte interactive de Madagascar</h1>
      <p className="text-gray-600 mb-6">
        Explorez les lieux touristiques sur la carte. Cliquez sur un marqueur pour plus d'informations.
      </p>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Suspense fallback={<div className="h-[600px] flex items-center justify-center">Chargement de la carte...</div>}>
          <DynamicMap lieux={lieux} />
        </Suspense>
      </div>

      {/* Légende des types de lieux */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded-full"></div>
          <span>Site Culturel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded-full"></div>
          <span>Parc National</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
          <span>Plage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
          <span>Montagne</span>
        </div>
      </div>
    </div>
  )
}