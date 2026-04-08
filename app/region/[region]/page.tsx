import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import { parseImages, RegionLabels, TypeLieuLabels } from "@/types/lieu"
import { regionsData } from "@/lib/constants/regions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Utensils, Users, Ruler } from "lucide-react"

interface PageProps {
  params: Promise<{ region: string }> | { region: string }
}

async function getLieuxByRegion(region: string) {
  try {
    const lieux = await prisma.lieu.findMany({
      where: { region },
      orderBy: { nom: 'asc' }
    })
    return lieux.map(lieu => ({
      ...lieu,
      imagesArray: parseImages(lieu.images)
    }))
  } catch (error) {
    return []
  }
}

export default async function RegionPage({ params }: PageProps) {
  const { region } = await params
  const regionKey = region as keyof typeof RegionLabels
  if (!RegionLabels[regionKey]) notFound()

  // ✅ Correction : forcer le type de regionKey comme clé de regionsData
  const regionInfo = regionsData[regionKey as keyof typeof regionsData]
  
  // Valeurs par défaut
  const descriptionParagraphs = regionInfo?.descriptionParagraphs || ['Description non disponible.']
  const images = regionInfo?.images || []
  const attractions = regionInfo?.attractions || []
  const superficie = regionInfo?.superficie || 'Non renseignée'
  const population = regionInfo?.population || 'Non renseignée'
  const cuisine = regionInfo?.cuisine || []

  const lieux = await getLieuxByRegion(region)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Galerie d'images */}
      {images.length > 0 && (
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div className="flex h-full">
            {images.slice(0, 3).map((img, index) => (
              <div key={index} className="relative flex-1">
                <img
                  src={img}
                  alt={`${regionInfo?.name || region} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute bottom-8 left-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold">{regionInfo?.name || region}</h1>
          </div>
        </div>
      )}

      <div className="container py-12">
        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">À propos de la région</h2>
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Informations générales */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-red-600" />
              <span>Superficie : {superficie}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-red-600" />
              <span>Population : {population}</span>
            </div>
            <div className="flex items-center gap-2">
              <Utensils className="h-5 w-5 text-red-600" />
              <span>Spécialités : {cuisine.join(', ') || 'Non renseignées'}</span>
            </div>
          </div>
        </div>

        {/* Attractions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Attractions principales</h2>
          <div className="flex flex-wrap gap-2">
            {attractions.map((attraction) => (
              <span key={attraction} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                {attraction}
              </span>
            ))}
          </div>
        </div>

        {/* Liste des lieux */}
        {/* Liste des lieux à visiter */}
<h2 className="text-2xl font-bold mb-4">Lieux à visiter ({lieux.length})</h2>
{lieux.length === 0 ? (
  <p className="text-center text-gray-500 py-12">Aucun lieu enregistré pour cette région</p>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {lieux.map((lieu) => (
      <div key={lieu.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
        <div className="h-48 bg-gray-200">
          {lieu.imagesArray && lieu.imagesArray.length > 0 ? (
            <img src={lieu.imagesArray[0]} alt={lieu.nom} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">Pas d'image</div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-xl mb-2">{lieu.nom}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            {TypeLieuLabels[lieu.type as keyof typeof TypeLieuLabels]}
          </div>
          <p className="text-gray-600 mb-4 line-clamp-2">{lieu.description}</p>
          <Link href={`/lieux/${lieu.id}`}>
            <Button variant="outline" className="w-full">Voir détails</Button>
          </Link>
        </div>
      </div>
    ))}
  </div>
)}
      </div>
    </div>
  )
}