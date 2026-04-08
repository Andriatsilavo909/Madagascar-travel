import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";

// Définir le type Guide (si non importé depuis Prisma)
type Guide = {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  circuit: string;
  createdAt: Date;
};

async function getGuides(): Promise<Guide[]> {
  return await prisma.guide.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export default async function AdminGuidesPage() {
  const guides = await getGuides();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Liste des guides</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Circuit</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {guides.map((guide: Guide) => (
              <tr key={guide.id}>
                <td className="px-6 py-4 whitespace-nowrap">{guide.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.telephone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.circuit}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Link href={`/admin/guides/${guide.id}/edit`}>
                    <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                  </Link>
                  <DeleteButton id={guide.id} type="guide" />
                </td>
                
              </table>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}