'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Fonctions de validation côté client
const validatePhone = (phone: string): string => {
  const phoneRegex = /^(\+261|0)[0-9]{9,10}$/;
  if (!phone) return 'Le téléphone est requis';
  if (!phoneRegex.test(phone)) return 'Format invalide (ex: 0340000000 ou +261340000000)';
  return '';
};

const validateName = (name: string, field: string): string => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/;
  if (!name) return `Le ${field} est requis`;
  if (!nameRegex.test(name)) return `${field} invalide (lettres uniquement)`;
  return '';
};

const validateSpecialite = (specialite: string): string => {
  const specialiteRegex = /^[a-zA-ZÀ-ÿ\s\-,]+$/;
  if (!specialite) return 'La spécialité est requise';
  if (!specialiteRegex.test(specialite)) return 'Spécialité invalide';
  return '';
};

export default function AjoutGuidePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    const nomError = validateName(formData.nom, 'nom');
    if (nomError) newErrors.nom = nomError;
    
    const prenomError = validateName(formData.prenom, 'prénom');
    if (prenomError) newErrors.prenom = prenomError;
    
    const phoneError = validatePhone(formData.telephone);
    if (phoneError) newErrors.telephone = phoneError;
    
    const specialiteError = validateSpecialite(formData.specialite);
    if (specialiteError) newErrors.specialite = specialiteError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const res = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Erreur');
      }
      router.push('/admin/guides');
      router.refresh();
    } catch (error: any) {
      alert(error.message);
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
          <Input 
            id="nom" 
            name="nom" 
            value={formData.nom} 
            onChange={handleChange} 
            className={errors.nom ? 'border-red-500' : ''}
            required 
          />
          {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
        </div>
        
        <div>
          <Label htmlFor="prenom">Prénom *</Label>
          <Input 
            id="prenom" 
            name="prenom" 
            value={formData.prenom} 
            onChange={handleChange} 
            className={errors.prenom ? 'border-red-500' : ''}
            required 
          />
          {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>}
        </div>
        
        <div>
          <Label htmlFor="telephone">Téléphone *</Label>
          <Input 
            id="telephone" 
            name="telephone" 
            value={formData.telephone} 
            onChange={handleChange} 
            className={errors.telephone ? 'border-red-500' : ''}
            placeholder="0340000000 ou +261340000000"
            required 
          />
          {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>}
        </div>
        
        <div>
          <Label htmlFor="specialite">Spécialité *</Label>
          <Input 
            id="specialite" 
            name="specialite" 
            value={formData.specialite} 
            onChange={handleChange} 
            className={errors.specialite ? 'border-red-500' : ''}
            placeholder="Randonnée, Culture, Nature..."
            required 
          />
          {errors.specialite && <p className="text-red-500 text-sm mt-1">{errors.specialite}</p>}
        </div>
        
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            name="description" 
            rows={4} 
            value={formData.description} 
            onChange={handleChange} 
          />
        </div>
        
        <div>
          <Label htmlFor="userId">ID Utilisateur (optionnel)</Label>
          <Input 
            id="userId" 
            name="userId" 
            value={formData.userId} 
            onChange={handleChange} 
            placeholder="Lier à un compte utilisateur" 
          />
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