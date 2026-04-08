import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import { parseImages, RegionLabels, TypeLieuLabels } from "@/types/lieu"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Interface pour typer les props (Next.js 15+ utilise des Promises)
interface PageProps {
  params: Promise<{ id: string }>
}

// Récupérer les données du lieu par son ID
async function getLieu(id: string) {
  try {
    const lieu = await prisma.lieu.findUnique({
      where: { id }
    })
    if (!lieu) return null
    // Ajouter le tableau d'images
    return {
      ...lieu,
      imagesArray: parseImages(lieu.images)
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du lieu:", error)
    return null
  }
}

// Métadonnées dynamiques pour le SEO
export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const lieu = await getLieu(id)
  if (!lieu) {
    return { title: "Lieu non trouvé" }
  }
  return {
    title: `${lieu.nom} - Madagascar Travel`,
    description: lieu.description.substring(0, 160)
  }
}

export default async function LieuDetailPage({ params }: PageProps) {
  const { id } = await params
  const lieu = await getLieu(id)

  if (!lieu) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero avec image principale */}
      <div className="relative h-[50vh] md:h-[60vh] bg-gray-900">
        {lieu.imagesArray && lieu.imagesArray.length > 0 ? (
          <Image
            src={lieu.imagesArray[0]}
            alt={lieu.nom}
            fill
            className="object-cover opacity-90"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-red-600 to-green-600" />
        )}
        <div className="absolute inset-0 bg-black/40" />

        {/* Bouton retour */}
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <Link href="/lieux">
            <Button variant="outline" className="bg-white/90 hover:bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux lieux
            </Button>
          </Link>
        </div>

        {/* Titre sur l'image */}
        <div className="absolute bottom-8 left-4 md:bottom-16 md:left-16 text-white">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-red-600 px-3 py-1 rounded-full text-sm">
              {TypeLieuLabels[lieu.type as keyof typeof TypeLieuLabels]}
            </span>
            <span className="bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {RegionLabels[lieu.region as keyof typeof RegionLabels]}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">{lieu.nom}</h1>
          <p className="text-lg md:text-xl text-gray-200">
            {lieu.lat}°, {lieu.lng}°
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale - Description */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">À propos de ce lieu</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {lieu.description}
              </p>

              {/* Galerie d'images supplémentaires */}
              {lieu.imagesArray && lieu.imagesArray.length > 1 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Galerie photos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {lieu.imagesArray.slice(1).map((img, index) => (
                      <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                        <Image
                          src={img}
                          alt={`${lieu.nom} - ${index + 2}`}
                          fill
                          className="object-cover hover:scale-110 transition duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Colonne latérale - Informations pratiques */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Informations</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Région</p>
                  <p className="font-medium">{RegionLabels[lieu.region as keyof typeof RegionLabels]}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{TypeLieuLabels[lieu.type as keyof typeof TypeLieuLabels]}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Coordonnées GPS</p>
                  <p className="font-medium">{lieu.lat}° N, {lieu.lng}° E</p>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500 mb-2">Note moyenne</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">5.0 (12 avis)</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700">
                    Ajouter aux favoris
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Partager
                  </Button>
                </div>

                {/* Mini carte (simulée) */}
                <div className="mt-4 h-48 bg-gray-200 rounded-lg overflow-hidden relative">
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
                    Carte interactive bientôt disponible
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Link href={`/plan?lat=${lieu.lat}&lng=${lieu.lng}`}>
                      <Button size="sm" variant="secondary" className="text-xs">
                        Voir sur la carte
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}