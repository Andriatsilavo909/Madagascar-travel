import { prisma } from "@/lib/db/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

async function getGuides() {
  return await prisma.guide.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export default async function GuidesListPage() {
  const guides = await getGuides()

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Liste des guides</h1>
        <Link href="/admin/guides/ajout">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un guide
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Circuit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date naissance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu naissance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {guides.map((guide) => (
              <tr key={guide.id}>
                <td className="px-6 py-4 whitespace-nowrap">{guide.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.telephone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.circuit}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(guide.dateNaissance).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.lieuNaissance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}