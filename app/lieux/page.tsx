import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import DeleteLieuButton from "@/components/admin/DeleteLieuButton";
import { parseImages } from "@/types/lieu";

async function getLieux() {
  const lieux = await prisma.lieu.findMany({
    orderBy: { createdAt: 'desc' },
    include: { createdBy: { select: { name: true, email: true } } }
  });
  
  return lieux.map(lieu => ({
    ...lieu,
    imagesArray: parseImages(lieu.images)
  }));
}

export default async function AdminLieuxPage() {
  const lieux = await getLieux();

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

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Région</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Créé par</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lieux.map((lieu) => (
              <tr key={lieu.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {lieu.imagesArray && lieu.imagesArray.length > 0 ? (
                    <img src={lieu.imagesArray[0]} alt={lieu.nom} className="h-10 w-10 object-cover rounded" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{lieu.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lieu.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lieu.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lieu.createdBy?.name || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Link href={`/admin/lieux/${lieu.id}/modifier`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <DeleteLieuButton id={lieu.id} lieuName={lieu.nom} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}