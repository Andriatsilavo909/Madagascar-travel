import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { revalidatePath } from "next/cache";

async function getPendingGuides() {
  return await prisma.guide.findMany({
    where: { status: "en_attente" },
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } }
  });
}

async function updateGuideStatus(id: string, status: 'approuve' | 'refuse') {
  'use server';
  await prisma.guide.update({ where: { id }, data: { status } });
  revalidatePath('/admin/guide-requests');
}

export default async function AdminGuideRequestsPage() {
  const guides = await getPendingGuides();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Demandes de devenir guide</h1>
      {guides.length === 0 ? (
        <p className="text-gray-500">Aucune demande en attente.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spécialité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Demandeur</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guides.map((guide) => (
                <tr key={guide.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.prenom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.telephone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.specialite}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.user.name} ({guide.user.email})</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <form action={async () => { 'use server'; await updateGuideStatus(guide.id, 'approuve'); }}>
                      <Button variant="outline" size="sm" type="submit"><Check className="h-4 w-4 text-green-600" /></Button>
                    </form>
                    <form action={async () => { 'use server'; await updateGuideStatus(guide.id, 'refuse'); }}>
                      <Button variant="outline" size="sm" type="submit"><X className="h-4 w-4 text-red-600" /></Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}