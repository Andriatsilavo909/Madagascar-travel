'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ModifierLieuPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nom: '',
    region: 'ANTANANARIVO',
    description: '',
    type: 'CULTUREL',
    lat: '',
    lng: '',
    imagesArray: [''],
  });

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

  useEffect(() => {
    const fetchLieu = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/lieux/${id}`);
        if (!res.ok) throw new Error('Lieu non trouvé');
        const data = await res.json();
        setFormData({
          nom: data.nom || '',
          region: data.region || 'ANTANANARIVO',
          description: data.description || '',
          type: data.type || 'CULTUREL',
          lat: String(data.lat ?? ''),
          lng: String(data.lng ?? ''),
          imagesArray: data.imagesArray?.length > 0 ? data.imagesArray : [''],
        });
      } catch (err: any) {
        setError('Erreur lors du chargement du lieu');
      } finally {
        setIsFetching(false);
      }
    };
    fetchLieu();
  }, [id]);

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
      setFormData({ ...formData, imagesArray: formData.imagesArray.filter((_, i) => i !== index) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const cleanImages = formData.imagesArray.filter(img => img.trim() !== '');

    const payload = {
      nom: formData.nom,
      region: formData.region,
      description: formData.description,
      type: formData.type,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      imagesArray: cleanImages,
    };

    try {
      const res = await fetch(`http://localhost:4000/api/lieux/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors de la modification');

      router.push('/admin/lieux');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la modification');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <div className="text-center py-12">Chargement...</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Modifier le lieu</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">❌ {error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div>
          <Label htmlFor="nom">Nom *</Label>
          <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="region">Région *</Label>
          <select id="region" name="region" value={formData.region} onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500" required>
            {regions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>

        <div>
          <Label htmlFor="type">Type *</Label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-red-500" required>
            {types.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>

        <div>
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" name="description" rows={4} value={formData.description} onChange={handleChange} required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lat">Latitude *</Label>
            <Input id="lat" name="lat" type="number" step="any" value={formData.lat} onChange={handleChange} required placeholder="-18.9237" />
          </div>
          <div>
            <Label htmlFor="lng">Longitude *</Label>
            <Input id="lng" name="lng" type="number" step="any" value={formData.lng} onChange={handleChange} required placeholder="47.5327" />
          </div>
        </div>

        <div>
          <Label>Images (URLs directes .jpg / .png / .webp)</Label>
          {formData.imagesArray.map((img, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                type="url"
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="https://exemple.com/image.jpg"
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
            + Ajouter une image
          </Button>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
            {isLoading ? 'Modification...' : 'Enregistrer les modifications'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}