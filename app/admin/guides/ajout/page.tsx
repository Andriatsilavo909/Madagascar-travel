'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function AjoutGuidePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    specialite: '',
    description: '',
    userId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Erreur');
      router.push('/admin/guides');
      router.refresh();
    } catch (error) {
      alert('Erreur lors de l\'ajout');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Ajouter un guide</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <Label htmlFor="nom">Nom *</Label>
          <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="prenom">Prénom *</Label>
          <Input id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="telephone">Téléphone *</Label>
          <Input id="telephone" name="telephone" value={formData.telephone} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="specialite">Spécialité *</Label>
          <Input id="specialite" name="specialite" value={formData.specialite} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="userId">ID Utilisateur (optionnel)</Label>
          <Input id="userId" name="userId" value={formData.userId} onChange={handleChange} placeholder="Lier à un compte utilisateur" />
        </div>
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
            {isLoading ? 'Ajout en cours...' : 'Ajouter le guide'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}