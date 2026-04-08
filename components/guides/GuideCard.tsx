import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, AlertCircle } from "lucide-react"

interface GuideCardProps {
  guide: any
  compact?: boolean
}

export function GuideCard({ guide, compact = false }: GuideCardProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      itineraire: "bg-blue-100 text-blue-800",
      pratique: "bg-green-100 text-green-800",
      culture: "bg-amber-100 text-amber-800",
      saison: "bg-purple-100 text-purple-800"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      itineraire: "Itinéraire",
      pratique: "Conseil pratique",
      culture: "Culture",
      saison: "Quand partir ?"
    }
    return labels[category as keyof typeof labels] || category
  }

  if (compact) {
    return (
      <Link href={`/guides/${guide.slug}`}>
        <Card className="hover:shadow-lg transition cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(guide.category)}`}>
                  {getCategoryLabel(guide.category)}
                </span>
                <h3 className="font-semibold mt-2">{guide.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">{guide.subtitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/guides/${guide.slug}`}>
      <Card className="h-full hover:shadow-lg transition cursor-pointer">
        <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
          <img
            src={guide.image}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(guide.category)}`}>
              {getCategoryLabel(guide.category)}
            </span>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{guide.title}</CardTitle>
          <p className="text-sm text-gray-600">{guide.subtitle}</p>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {guide.duration && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {guide.duration}
              </div>
            )}
            {guide.difficulty && (
              <div className="flex items-center">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  guide.difficulty === "Facile" ? "bg-green-100 text-green-700" :
                  guide.difficulty === "Modéré" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {guide.difficulty}
                </span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="text-red-600 hover:text-red-700 p-0">
            Lire le guide →
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}