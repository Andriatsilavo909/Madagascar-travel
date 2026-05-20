import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import { Check, X, DollarSign } from "lucide-react";
import { revalidatePath } from "next/cache";

async function getBookings() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Enrichir avec les noms des clients et guides
  const enriched = await Promise.all(bookings.map(async (booking) => {
    const client = await prisma.user.findUnique({
      where: { id: booking.clientId },
      select: { name: true, email: true }
    });
    const guide = await prisma.guide.findUnique({
      where: { id: booking.guideId },
      select: { nom: true, prenom: true }
    });
    return { ...booking, client, guide };
  }));

  return enriched;
}

async function updateBookingStatus(id: string, status: 'confirme' | 'paye' | 'annule') {
  'use server';
  await prisma.booking.update({ where: { id }, data: { status } });
  revalidatePath('/admin/bookings');
}

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Réservations de guides</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guide</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.client?.name || booking.clientId} ({booking.client?.email || '?'})
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {booking.guide?.prenom} {booking.guide?.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(booking.startDate).toLocaleDateString('fr-FR')} → {new Date(booking.endDate).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.totalAmount} €</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'paye' ? 'bg-green-100 text-green-800' :
                    booking.status === 'confirme' ? 'bg-blue-100 text-blue-800' :
                    booking.status === 'annule' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status === 'en_attente' ? 'En attente' :
                     booking.status === 'confirme' ? 'Confirmé' :
                     booking.status === 'paye' ? 'Payé' : 'Annulé'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  {booking.status === 'en_attente' && (
                    <form action={async () => { 'use server'; await updateBookingStatus(booking.id, 'confirme'); }}>
                      <Button variant="outline" size="sm" type="submit"><Check className="h-4 w-4 text-green-600" /></Button>
                    </form>
                  )}
                  {booking.status === 'confirme' && (
                    <form action={async () => { 'use server'; await updateBookingStatus(booking.id, 'paye'); }}>
                      <Button variant="outline" size="sm" type="submit"><DollarSign className="h-4 w-4 text-blue-600" /></Button>
                    </form>
                  )}
                  {booking.status !== 'annule' && (
                    <form action={async () => { 'use server'; await updateBookingStatus(booking.id, 'annule'); }}>
                      <Button variant="outline" size="sm" type="submit"><X className="h-4 w-4 text-red-600" /></Button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}