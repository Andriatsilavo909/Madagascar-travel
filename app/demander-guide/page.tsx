'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DemanderGuidePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [guides, setGuides] = useState([]);
  const [form, setForm] = useState({
    guideId: '',
    startDate: '',
    endDate: '',
    totalAmount: 0,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/guides?status=approuve')
      .then(res => res.json())
      .then(data => setGuides(data))
      .catch(err => console.error(err));
  }, []);

  if (status === 'loading') return <div>Chargement...</div>;
  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Validation simple
    if (!form.guideId || !form.startDate || !form.endDate || form.totalAmount <= 0) {
      setError('Veuillez remplir tous les champs correctement.');
      return;
    }
    if (new Date(form.startDate) >= new Date(form.endDate)) {
      setError('La date de fin doit être postérieure à la date de début.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ guideId: '', startDate: '', endDate: '', totalAmount: 0 });
      } else {
        const data = await res.json();
        setError(data.error || 'Erreur lors de la demande');
      }
    } catch (err) {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Demander un guide</h1>
      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6">
          ✅ Votre demande a été envoyée. L'administrateur la traitera sous 48h.
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          ❌ {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Guide *</label>
          <select
            required
            value={form.guideId}
            onChange={e => setForm({ ...form, guideId: e.target.value })}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Choisissez un guide</option>
            {guides.map((guide: any) => (
              <option key={guide.id} value={guide.id}>
                {guide.prenom} {guide.nom} - {guide.specialite || guide.circuit}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de début *</label>
          <input
            type="date"
            required
            value={form.startDate}
            onChange={e => setForm({ ...form, startDate: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date de fin *</label>
          <input
            type="date"
            required
            value={form.endDate}
            onChange={e => setForm({ ...form, endDate: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Montant total (€) *</label>
          <input
            type="number"
            step="0.01"
            required
            value={form.totalAmount === 0 ? '' : form.totalAmount}
            onChange={e => {
              const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
              setForm({ ...form, totalAmount: isNaN(val) ? 0 : val });
            }}
            className="w-full p-3 border rounded-lg"
            placeholder="Ex: 1500"
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
          {loading ? 'Envoi en cours...' : 'Envoyer la demande'}
        </Button>
      </form>
    </div>
  );
}