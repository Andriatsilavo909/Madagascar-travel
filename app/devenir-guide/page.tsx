'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DevenirGuidePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    specialite: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Redirection si non connecté (dans useEffect)
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') return <div>Chargement...</div>;
  if (!session) return null; // Ne rien afficher pendant la redirection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
        setForm({ nom: '', prenom: '', telephone: '', specialite: '', description: '' });
      } else {
        setError(data.error || 'Erreur');
      }
    } catch (err) {
      setError('Erreur réseau');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container py-12 max-w-2xl mx-auto text-center">
        <div className="bg-green-100 text-green-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">✅ Félicitations !</h2>
          <p>Vous êtes maintenant guide. Vous pouvez vous reconnecter pour accéder à votre espace guide.</p>
          <Button onClick={() => router.push('/espace-guide')} className="mt-4 bg-red-600">
            Accéder à mon espace guide
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Devenir guide</h1>
      <p className="text-gray-600 mb-8">Remplissez ce formulaire pour proposer vos services aux voyageurs.</p>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nom *</label>
          <input
            required
            className="w-full p-2 border rounded"
            value={form.nom}
            onChange={e => setForm({ ...form, nom: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Prénom *</label>
          <input
            required
            className="w-full p-2 border rounded"
            value={form.prenom}
            onChange={e => setForm({ ...form, prenom: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Téléphone *</label>
          <input
            required
            className="w-full p-2 border rounded"
            value={form.telephone}
            onChange={e => setForm({ ...form, telephone: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Spécialité *</label>
          <input
            required
            className="w-full p-2 border rounded"
            placeholder="Ex: Randonnée, Culture, Nature..."
            value={form.specialite}
            onChange={e => setForm({ ...form, specialite: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description (optionnelle)</label>
          <textarea
            rows={3}
            className="w-full p-2 border rounded"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-red-600 w-full">
          {loading ? 'Envoi...' : 'Devenir guide'}
        </Button>
      </form>
    </div>
  );
}