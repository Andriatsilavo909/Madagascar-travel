import { prisma } from "@/lib/db/prisma"
import Link from "next/link"
import { parseImages, RegionLabels, TypeLieuLabels } from "@/types/lieu"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
import ImageWithFallback from "@/components/ui/ImageWithFallback"

interface Lieu {
  id: string
  nom: string
  region: string
  description: string
  images: string
  lat: number
  lng: number
  type: string
  createdAt: Date
  updatedAt: Date
  createdById: string
}

interface LieuWithImages extends Lieu {
  imagesArray: string[]
}

async function getAllLieux(): Promise<LieuWithImages[]> {
  try {
    const lieux = await prisma.lieu.findMany({
      orderBy: { createdAt: 'desc' }
    })
    
    return (lieux as Lieu[]).map((lieu) => ({
      ...lieu,
      imagesArray: parseImages(lieu.images)
    }))
  } catch (error) {
    console.error('❌ Erreur chargement lieux:', error)
    return []
  }
}

export default async function LieuxPage() {
  const lieux = await getAllLieux()

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-4">Tous les lieux</h1>
      <p className="text-gray-600 mb-8">
        Découvrez {lieux.length} lieux touristiques à Madagascar
      </p>

      {lieux.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          Aucun lieu disponible pour le moment
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lieux.map((lieu) => (
            <div key={lieu.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gray-200">
                {lieu.imagesArray && lieu.imagesArray.length > 0 ? (
                  <ImageWithFallback 
                    src={lieu.imagesArray[0]} 
                    alt={lieu.nom}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Image non disponible
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{lieu.nom}</h2>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                    {TypeLieuLabels[lieu.type as keyof typeof TypeLieuLabels]}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {RegionLabels[lieu.region as keyof typeof RegionLabels]}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{lieu.description}</p>
                <Link href={`/lieux/${lieu.id}`}>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Voir détails
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}