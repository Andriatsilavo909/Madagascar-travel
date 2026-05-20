'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function EditLieuForm({ lieu }: { lieu: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nom: lieu.nom,
    region: lieu.region,
    description: lieu.description,
    type: lieu.type,
    lat: lieu.lat.toString(),
    lng: lieu.lng.toString(),
    imagesArray: lieu.imagesArray || [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.imagesArray];
    newImages[index] = value;
    setFormData({ ...formData, imagesArray: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, imagesArray: [...formData.imagesArray, ''] });
  };

  const removeImageField = (index: number) => {
    if (formData.imagesArray.length > 1) {
      const newImages = formData.imagesArray.filter((_, i) => i !== index);
      setFormData({ ...formData, imagesArray: newImages });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/lieux?id=${lieu.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          region: formData.region,
          description: formData.description,
          type: formData.type,
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
          imagesArray: formData.imagesArray.filter(img => img.trim() !== ''),
        }),
      });
      if (!res.ok) throw new Error('Erreur');
      router.push('/admin/lieux');
      router.refresh();
    } catch (error) {
      alert('Erreur lors de la modification');
    } finally {
      setIsLoading(false);
    }
  };

  const regions = [
    { value: 'ANTANANARIVO', label: 'Antananarivo' },
    { value: 'TOAMASINA', label: 'Toamasina' },
    { value: 'MAHAJANGA', label: 'Mahajanga' },
    { value: 'FIANARANTSOA', label: 'Fianarantsoa' },
    { value: 'ANTSIRANANA', label: 'Antsiranana' },
    { value: 'TOLIARA', label: 'Toliara' },
  ];

  const types = [
    { value: 'CULTUREL', label: 'Site Culturel' },
    { value: 'PARC', label: 'Parc National' },
    { value: 'PLAGE', label: 'Plage' },
    { value: 'MONTAGNE', label: 'Montagne' },
    { value: 'VILLE', label: 'Ville' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <Label htmlFor="nom">Nom *</Label>
        <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
      </div>
      
      <div>
        <Label htmlFor="region">Région *</Label>
        <select
          id="region"
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
          required
        >
          {regions.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <Label htmlFor="type">Type *</Label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500"
          required
        >
          {types.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} required />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="lat">Latitude *</Label>
          <Input id="lat" name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="lng">Longitude *</Label>
          <Input id="lng" name="lng" type="number" step="any" value={formData.lng} onChange={handleChange} required />
        </div>
      </div>
      
      <div>
        <Label>Images (URLs)</Label>
        {formData.imagesArray.map((img, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              type="url"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="https://..."
              className="flex-1"
            />
            {formData.imagesArray.length > 1 && (
              <Button type="button" variant="destructive" size="sm" onClick={() => removeImageField(index)}>
                Supprimer
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addImageField}>
          Ajouter une image
        </Button>
      </div>
      
      <div className="flex gap-4 pt-4">
        <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
          {isLoading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>
    </form>
  );
}