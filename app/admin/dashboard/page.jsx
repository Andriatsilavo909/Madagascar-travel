import { prisma } from "@/lib/db/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, BookOpen, Camera } from "lucide-react"
import Link from "next/link"

async function getStats() {
  const [lieuxCount, usersCount, guidesCount] = await Promise.all([
    prisma.lieu.count(),
    prisma.user.count(),
    prisma.guide.count().catch(() => 0), // si la table Guide n'existe pas, retourne 0
  ])

  return { lieuxCount, usersCount, guidesCount }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue dans l'interface d'administration.</p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total lieux</CardTitle>
            <MapPin className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lieuxCount}</div>
            <p className="text-xs text-gray-500 mt-1">Lieux touristiques enregistrés</p>
            <Link href="/admin/lieux" className="text-sm text-red-600 hover:underline mt-2 inline-block">
              Voir tous →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.usersCount}</div>
            <p className="text-xs text-gray-500 mt-1">Comptes clients et administrateurs</p>
            <Link href="/admin/utilisateurs" className="text-sm text-red-600 hover:underline mt-2 inline-block">
              Gérer →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Guides</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.guidesCount}</div>
            <p className="text-xs text-gray-500 mt-1">Guides locaux référencés</p>
            <Link href="/admin/guides" className="text-sm text-red-600 hover:underline mt-2 inline-block">
              Voir la liste →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Régions</CardTitle>
            <Camera className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-500 mt-1">Régions touristiques</p>
            <Link href="/region" className="text-sm text-red-600 hover:underline mt-2 inline-block">
              Explorer →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Section d'actions rapides */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/admin/lieux/ajout" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100">
            <h3 className="font-medium">➕ Ajouter un lieu</h3>
            <p className="text-sm text-gray-500 mt-1">Créer une nouvelle fiche lieu</p>
          </Link>
          <Link href="/admin/guides/ajout" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100">
            <h3 className="font-medium">👤 Ajouter un guide</h3>
            <p className="text-sm text-gray-500 mt-1">Enregistrer un guide local</p>
          </Link>
          <Link href="/admin/utilisateurs" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-100">
            <h3 className="font-medium">🔐 Gérer les utilisateurs</h3>
            <p className="text-sm text-gray-500 mt-1">Modifier les rôles, supprimer</p>
          </Link>
        </div>
      </div>
    </div>
  )
}