'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ModifierGuidePage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    nom: '', prenom: '', telephone: '', email: '',
    adresse: '', specialite: '', circuit: '', experience: '', description: '',
  });

  useEffect(() => {
    fetch(`http://localhost:4000/api/guides/${id}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          nom: data.nom || '',
          prenom: data.prenom || '',
          telephone: data.telephone || '',
          email: data.email || '',
          adresse: data.adresse || '',
          specialite: data.specialite || '',
          circuit: data.circuit || '',
          experience: data.experience || '',
          description: data.description || '',
        });
      })
      .catch(() => setError('Erreur lors du chargement'))
      .finally(() => setIsFetching(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch(`http://localhost:4000/api/guides/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur lors de la modification');
      router.push('/admin/guides');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="text-center py-12">Chargement...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Modifier le guide</h1>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">❌ {error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Nom *</Label><Input required value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} /></div>
          <div><Label>Prénom *</Label><Input required value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} /></div>
        </div>
        <div><Label>Téléphone *</Label><Input required value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} /></div>
        <div><Label>Email</Label><Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} /></div>
        <div><Label>Adresse</Label><Input value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} /></div>
        <div><Label>Spécialité *</Label><Input required value={form.specialite} onChange={e => setForm({...form, specialite: e.target.value})} /></div>
        <div><Label>Circuit</Label><Input value={form.circuit} onChange={e => setForm({...form, circuit: e.target.value})} /></div>
        <div><Label>Expérience</Label><Input value={form.experience} onChange={e => setForm({...form, experience: e.target.value})} /></div>
        <div><Label>Description</Label><textarea rows={3} className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500 outline-none" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
            {isLoading ? 'Modification...' : 'Enregistrer'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
        </div>
      </form>
    </div>
  );
}