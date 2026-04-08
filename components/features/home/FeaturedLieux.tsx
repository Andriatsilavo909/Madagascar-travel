"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Tag, Star } from "lucide-react"
import { Lieu } from "@/types/lieu"
import { RegionLabels, TypeLieuLabels } from "@/types/lieu"

interface FeaturedLieuxProps {
  lieux: Array<Lieu & { imagesArray: string[] }>
}

export function FeaturedLieux({ lieux }: FeaturedLieuxProps) {
  if (!lieux || !Array.isArray(lieux)) {
    return <p className="text-center text-gray-500">Aucun lieu disponible</p>;
  }
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Lieux incontournables</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les merveilles de Madagascar à travers notre sélection de lieux exceptionnels
          </p>
        </div>
        
        {lieux.length === 0 ? (
          <p className="text-center text-gray-500">Aucun lieu disponible pour le moment</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lieux.map((lieu) => (
              <Card key={lieu.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  {lieu.imagesArray && lieu.imagesArray.length > 0 ? (
                    <img 
                      src={lieu.imagesArray[0]} 
                      alt={lieu.nom}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x300?text=Image+non+disponible"
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Image non disponible
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold shadow">
                    {TypeLieuLabels[lieu.type]}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{lieu.nom}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    {RegionLabels[lieu.region]}
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {lieu.description}
                  </p>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center">
                  <Link href={`/lieux/${lieu.id}`}>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </Link>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/lieux">
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              Voir tous les lieux
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}