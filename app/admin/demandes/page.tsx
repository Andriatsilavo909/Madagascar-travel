import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { sendStatusEmail } from "@/lib/email";
import { revalidatePath } from "next/cache";

async function getDemandes() {
  return await prisma.demande.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

async function updateStatus(id: string, status: 'confirme' | 'refuse') {
  'use server';
  const demande = await prisma.demande.findUnique({ where: { id } });
  if (!demande) throw new Error("Demande non trouvée");

  // Mettre à jour le statut dans la base
  await prisma.demande.update({
    where: { id },
    data: { status }
  });

  // Trouver l'utilisateur correspondant à l'email
  const user = await prisma.user.findFirst({
    where: { email: demande.email }
  });

  if (user) {
    const title = status === 'confirme' ? '✅ Demande acceptée' : '❌ Demande refusée';
    const message = status === 'confirme'
      ? `Votre demande de voyage du ${new Date(demande.createdAt).toLocaleDateString('fr-FR')} a été acceptée.`
      : `Votre demande de voyage du ${new Date(demande.createdAt).toLocaleDateString('fr-FR')} a été refusée.`;
    await prisma.notification.create({
      data: {
        userId: user.id,
        title,
        message,
        type: 'contact',
      }
    });
  }

  // Envoyer un email à l'utilisateur
  await sendStatusEmail(demande.email, demande.nom, status);

  // Revalider le chemin pour rafraîchir la liste
  revalidatePath('/admin/demandes');
}

export default async function AdminDemandesPage() {
  const demandes = await getDemandes();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Demandes de voyage</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {demandes.map((demande) => (
              <tr key={demande.id}>
                <td className="px-6 py-4 whitespace-nowrap">{demande.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{demande.email}</td>
                <td className="px-6 py-4">{demande.message}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    demande.status === 'confirme' ? 'bg-green-100 text-green-800' :
                    demande.status === 'refuse' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {demande.status === 'en_attente' ? 'En attente' : demande.status === 'confirme' ? 'Confirmé' : 'Refusé'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <form action={async () => { 'use server'; await updateStatus(demande.id, 'confirme'); }}>
                    <Button variant="outline" size="sm" type="submit"><Check className="h-4 w-4 text-green-600" /></Button>
                  </form>
                  <form action={async () => { 'use server'; await updateStatus(demande.id, 'refuse'); }}>
                    <Button variant="outline" size="sm" type="submit"><X className="h-4 w-4 text-red-600" /></Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}