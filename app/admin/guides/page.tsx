import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import { Lieu } from "@prisma/client";

async function getLieux(): Promise<Lieu[]> {
  return await prisma.lieu.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function AdminLieuxPage() {
  const lieux = await getLieux();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestion des lieux</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Région</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lieux.map((lieu: Lieu) => {
              let imageUrl = '';
              try {
                const images = JSON.parse(lieu.images);
                imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : '';
              } catch {
                imageUrl = '';
              }
              return (
                <tr key={lieu.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {imageUrl ? (
                      <img src={imageUrl} alt={lieu.nom} className="h-10 w-10 object-cover rounded" />
                    ) : (
                      <div className="h-10 w-10 bg-gray-200 rounded" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{lieu.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{lieu.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{lieu.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <Link href={`/admin/lieux/${lieu.id}/modifier`}>
                      <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                    </Link>
                    <DeleteButton id={lieu.id} type="lieu" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}