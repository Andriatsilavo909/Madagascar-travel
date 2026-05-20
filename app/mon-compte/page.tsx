'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Booking = {
  id: string;
  guide: { nom: string; prenom: string } | null;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

type TravelRequest = {
  id: string;
  message: string;
  status: string;
  createdAt: string;
};

type GuideRequest = {
  id: string;
  nom: string;
  prenom: string;
  status: string;
  createdAt: string;
};

export default function MonComptePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [travelRequests, setTravelRequests] = useState<TravelRequest[]>([]);
  const [guideRequests, setGuideRequests] = useState<GuideRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [bookingsRes, travelRes, guideRes] = await Promise.all([
        fetch('/api/user/bookings'),
        fetch('/api/user/travel-requests'),
        fetch('/api/user/guide-requests'),
      ]);
      const bookingsData = await bookingsRes.json();
      const travelData = await travelRes.json();
      const guideData = await guideRes.json();
      setBookings(bookingsData);
      setTravelRequests(travelData);
      setGuideRequests(guideData);
    } catch (error) {
      console.error('Erreur chargement données', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }
    if (status === 'authenticated') {
      fetchData();
      // Polling toutes les 10 secondes
      const interval = setInterval(fetchData, 10000);
      return () => clearInterval(interval);
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return <div className="container py-12">Chargement...</div>;
  }

  if (!session) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirme': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">Confirmé</span>;
      case 'refuse': return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">Refusé</span>;
      case 'paye': return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">Payé</span>;
      case 'en_attente': return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">En attente</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mon compte</h1>

      {/* Réservations de guides */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Mes réservations de guides</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">Aucune réservation.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow p-4 border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Guide : {booking.guide?.prenom} {booking.guide?.nom}</p>
                    <p className="text-sm text-gray-600">Du {new Date(booking.startDate).toLocaleDateString('fr-FR')} au {new Date(booking.endDate).toLocaleDateString('fr-FR')}</p>
                    <p className="text-sm text-gray-600">Montant : {booking.totalAmount} €</p>
                  </div>
                  <div>{getStatusBadge(booking.status)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Demandes de voyage (contact) */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Mes demandes de voyage</h2>
        {travelRequests.length === 0 ? (
          <p className="text-gray-500">Aucune demande.</p>
        ) : (
          <div className="space-y-4">
            {travelRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-lg shadow p-4 border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-700">{req.message}</p>
                    <p className="text-xs text-gray-400 mt-1">Envoyée le {new Date(req.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>{getStatusBadge(req.status)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Demandes pour devenir guide */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Mes demandes pour devenir guide</h2>
        {guideRequests.length === 0 ? (
          <p className="text-gray-500">Vous n'avez pas encore postulé pour devenir guide.</p>
        ) : (
          <div className="space-y-4">
            {guideRequests.map((req) => (
              <div key={req.id} className="bg-white rounded-lg shadow p-4 border">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{req.prenom} {req.nom}</p>
                    <p className="text-xs text-gray-400 mt-1">Demande du {new Date(req.createdAt).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>{getStatusBadge(req.status)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}