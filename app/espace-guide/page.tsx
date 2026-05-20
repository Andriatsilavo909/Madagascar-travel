'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Phone, Mail, MapPin, Clock, Check, X, Eye, DollarSign, Users, TrendingUp } from 'lucide-react';

type Booking = {
  id: string;
  client: { name: string; email: string };
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: string;
  message?: string;
  createdAt: string;
};

type GuideProfile = {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email?: string;
  specialite: string;
  description: string;
  status: string;
  createdAt: string;
};

type Stats = {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  totalRevenue: number;
  monthlyRevenue: number;
};

export default function EspaceGuidePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isGuide, setIsGuide] = useState(false);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profile, setProfile] = useState<GuideProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookings' | 'profile'>('dashboard');
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  });

  // Formulaire pour devenir guide
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    specialite: '',
    description: '',
  });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }
    if (status === 'authenticated' && session) {
      loadGuideData();
    }
  }, [status, session, router]);

  const loadGuideData = async () => {
    setLoading(true);
    try {
      // Vérifier si l'utilisateur est guide
      const profileRes = await fetch('/api/guide/profile');
      const profileData = await profileRes.json();
      
      if (profileRes.ok && profileData.isGuide) {
        setIsGuide(true);
        setProfile(profileData.guide);
        await Promise.all([
          fetchBookings(),
          fetchStats(),
        ]);
      }
    } catch (err) {
      console.error('Erreur chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/guide/bookings');
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Erreur chargement réservations:', err);
      setBookings([]);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/guide/bookings');
      const data = await res.json();
      const bookingsArray = Array.isArray(data) ? data : [];
      
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      const pending = bookingsArray.filter((b: Booking) => b.status === 'en_attente').length;
      const confirmed = bookingsArray.filter((b: Booking) => b.status === 'confirme' || b.status === 'acceptee').length;
      const cancelled = bookingsArray.filter((b: Booking) => b.status === 'refusee' || b.status === 'annule').length;
      const totalRevenue = bookingsArray.reduce((sum: number, b: Booking) => sum + (b.totalAmount || 0), 0);
      
      const monthlyRevenue = bookingsArray
        .filter((b: Booking) => {
          const date = new Date(b.createdAt);
          return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        })
        .reduce((sum: number, b: Booking) => sum + (b.totalAmount || 0), 0);
      
      setStats({
        total: bookingsArray.length,
        pending,
        confirmed,
        cancelled,
        totalRevenue,
        monthlyRevenue,
      });
    } catch (err) {
      console.error('Erreur chargement stats:', err);
    }
  };

  const updateBookingStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/guide/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        await fetchBookings();
        await fetchStats();
      } else {
        alert('Erreur lors de la mise à jour');
      }
    } catch (err) {
      console.error('Erreur mise à jour:', err);
      alert('Erreur réseau');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError('');
    try {
      const res = await fetch('/api/guide/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        // Déconnecter pour forcer la mise à jour du rôle
        await signOut({ redirect: false });
        router.push('/auth/signin?registered=true');
      } else {
        setError(data.error || 'Erreur lors de l\'inscription');
      }
    } catch (err) {
      setError('Erreur réseau');
    } finally {
      setFormLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en_attente':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">En attente</span>;
      case 'confirme':
      case 'acceptee':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">Confirmé</span>;
      case 'refusee':
      case 'annule':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">Refusé</span>;
      case 'paye':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">Payé</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <p className="mt-2 text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (!session) return null;

  // Formulaire pour devenir guide
  if (!isGuide && !success) {
    return (
      <div className="container py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Devenir guide</h1>
        <p className="text-gray-600 mb-8">
          Remplissez ce formulaire pour proposer vos services aux voyageurs.
        </p>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
              value={form.nom}
              onChange={e => setForm({ ...form, nom: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prénom *</label>
            <input
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
              value={form.prenom}
              onChange={e => setForm({ ...form, prenom: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Téléphone *</label>
            <input
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
              value={form.telephone}
              onChange={e => setForm({ ...form, telephone: e.target.value })}
              placeholder="+261 34 00 000 00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Spécialité *</label>
            <input
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
              value={form.specialite}
              onChange={e => setForm({ ...form, specialite: e.target.value })}
              placeholder="Ex: Randonnée, Culture, Nature..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (optionnelle)</label>
            <textarea
              rows={3}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Présentez-vous, vos expériences, vos circuits..."
            />
          </div>
          <Button type="submit" disabled={formLoading} className="bg-red-600 hover:bg-red-700 w-full">
            {formLoading ? 'Envoi en cours...' : 'Devenir guide'}
          </Button>
        </form>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container py-12 max-w-2xl mx-auto text-center">
        <div className="bg-green-100 text-green-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">✅ Félicitations !</h2>
          <p>Vous êtes maintenant guide. Veuillez vous reconnecter.</p>
          <Button onClick={() => router.push('/auth/signin')} className="mt-4 bg-red-600">
            Se connecter
          </Button>
        </div>
      </div>
    );
  }

  // Dashboard du guide
  return (
    <div className="container py-12 max-w-6xl mx-auto">
      {/* En-tête avec bienvenue */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Espace guide</h1>
          <p className="text-gray-600 mt-1">
            Bienvenue {profile?.prenom} {profile?.nom}
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" onClick={() => router.push('/')}>
            Voir le site
          </Button>
          <Button variant="outline" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex flex-wrap gap-2 border-b mb-6">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'dashboard'
              ? 'border-b-2 border-red-600 text-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Tableau de bord
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'bookings'
              ? 'border-b-2 border-red-600 text-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Réservations ({stats.total})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'profile'
              ? 'border-b-2 border-red-600 text-red-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Mon profil
        </button>
      </div>

      {/* Tableau de bord */}
      {activeTab === 'dashboard' && (
        <div>
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Total réservations</p>
                <Users className="h-5 w-5 text-red-500" />
              </div>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">En attente</p>
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Confirmées</p>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-500">Chiffre d'affaires</p>
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-blue-600">{stats.totalRevenue.toLocaleString()} Ar</p>
            </div>
          </div>

          {/* Dernières réservations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold">Dernières demandes</h2>
            </div>
            <div className="p-6">
              {bookings.slice(0, 5).length === 0 ? (
                <p className="text-gray-500 text-center py-8">Aucune réservation pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{booking.client?.name || 'Client'}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.startDate).toLocaleDateString('fr-FR')} → {new Date(booking.endDate).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-sm font-semibold text-red-600">{booking.totalAmount.toLocaleString()} Ar</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(booking.status)}
                        <button
                          onClick={() => setActiveTab('bookings')}
                          className="ml-3 text-blue-600 hover:underline text-sm"
                        >
                          Voir détail
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Liste des réservations */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold">Toutes les réservations</h2>
          </div>
          <div className="p-6">
            {bookings.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Aucune réservation pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border rounded-lg p-5 hover:shadow-md transition">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.client?.name || 'Client'}</h3>
                        <p className="text-gray-500 text-sm">{booking.client?.email}</p>
                      </div>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Du {new Date(booking.startDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>Au {new Date(booking.endDate).toLocaleDateString('fr-FR')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>Demandé le {new Date(booking.createdAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Montant total</p>
                        <p className="text-xl font-bold text-red-600">{booking.totalAmount.toLocaleString()} Ar</p>
                      </div>
                      {booking.status === 'en_attente' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'acceptee')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" /> Accepter
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBookingStatus(booking.id, 'refusee')}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" /> Refuser
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profil guide */}
      {activeTab === 'profile' && profile && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Mon profil</h2>
            <Button variant="outline" size="sm">Modifier</Button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nom complet</p>
                <p className="font-medium text-lg">{profile.prenom} {profile.nom}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Téléphone</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="font-medium">{profile.telephone}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="font-medium">{session.user?.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Spécialité</p>
                <p className="font-medium">{profile.specialite}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Statut</p>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {profile.status === 'actif' ? 'Actif' : 'Inactif'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Membre depuis</p>
                <p className="font-medium">{new Date(profile.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">{profile.description || 'Aucune description fournie.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}