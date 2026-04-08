import { prisma } from "@/lib/db/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, MapPin, Calendar, User } from "lucide-react"

async function getGuides() {
  const guides = await prisma.guide.findMany({
    orderBy: { nom: 'asc' }
  })
  return guides
}

export default async function GuidesPublicsPage() {
  const guides = await getGuides()

  return (
    <div className="container py-12">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Nos guides locaux</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez nos guides professionnels qui vous accompagneront pour explorer Madagascar.
          Contactez-les directement pour organiser votre voyage.
        </p>
      </div>

      {guides.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Aucun guide disponible pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <Card key={guide.id} className="hover:shadow-lg transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-red-600" />
                  {guide.prenom} {guide.nom}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Téléphone</p>
                    <p className="text-sm text-gray-600">{guide.telephone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Adresse</p>
                    <p className="text-sm text-gray-600">{guide.adresse}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Circuit proposé</p>
                    <p className="text-sm text-gray-600">{guide.circuit}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <p className="text-xs text-gray-400">
                    Né(e) le {new Date(guide.dateNaissance).toLocaleDateString('fr-FR')} à {guide.lieuNaissance}
                  </p>
                </div>
                <Button 
                  className="w-full mt-2 bg-red-600 hover:bg-red-700"
                  onClick={() => window.location.href = `tel:${guide.telephone}`}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Appeler
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}