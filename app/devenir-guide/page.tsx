'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DevenirGuidePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    adresse: '',
    specialite: '',
    description: '',
    experience: '',
    circuit: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setForm({ nom: '', prenom: '', telephone: '', email: '', adresse: '', specialite: '', description: '', experience: '', circuit: '' });
      } else {
        setError(data.error || 'Erreur lors de l\'envoi');
      }
    } catch (err) {
      setError('Erreur réseau — vérifiez votre connexion');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container py-12 max-w-2xl mx-auto text-center">
        <div className="bg-green-100 text-green-700 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">✅ Demande envoyée !</h2>
          <p className="mb-4">Votre profil de guide a été créé avec succès. Vous apparaîtrez bientôt dans la liste des guides.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push('/guides')} className="bg-red-600 hover:bg-red-700">
              Voir les guides
            </Button>
            <Button variant="outline" onClick={() => setSuccess(false)}>
              Ajouter un autre guide
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Devenir guide</h1>
      <p className="text-gray-600 mb-8">Remplissez ce formulaire pour proposer vos services aux voyageurs.</p>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">❌ {error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nom *</label>
            <input required className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
              value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Prénom *</label>
            <input required className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
              value={form.prenom} onChange={e => setForm({ ...form, prenom: e.target.value })} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Téléphone *</label>
          <input required className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Ex: +261 34 00 000 00"
            value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="votre@email.com"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Adresse</label>
          <input className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Ex: Antananarivo, Madagascar"
            value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Spécialité *</label>
          <input required className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Ex: Randonnée, Culture, Nature, Plage..."
            value={form.specialite} onChange={e => setForm({ ...form, specialite: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Circuit proposé</label>
          <input className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Ex: Circuit Nord, Tour du Sud..."
            value={form.circuit} onChange={e => setForm({ ...form, circuit: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expérience</label>
          <input className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Ex: 5 ans de guide touristique"
            value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea rows={4} className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Décrivez vos services, langues parlées, points forts..."
            value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </div>

        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 w-full">
          {loading ? 'Envoi en cours...' : 'Soumettre ma candidature'}
        </Button>
      </form>
    </div>
  );
}