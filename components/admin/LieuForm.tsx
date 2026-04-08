'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RegionLabels, TypeLieuLabels } from '@/types/lieu'

interface LieuFormProps {
  initialData?: any
  isEditing?: boolean
}

export default function LieuForm({ initialData, isEditing = false }: LieuFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: initialData?.nom || '',
    region: initialData?.region || 'ANTANANARIVO',
    type: initialData?.type || 'CULTUREL',
    description: initialData?.description || '',
    lat: initialData?.lat || '',
    lng: initialData?.lng || '',
    images: initialData?.imagesArray ? initialData.imagesArray.join(', ') : '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Convertir les images en tableau
    const imagesArray = formData.images.split(',').map(s => s.trim()).filter(Boolean)

    const payload = {
      nom: formData.nom,
      region: formData.region,
      type: formData.type,
      description: formData.description,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
      imagesArray,
    }

    try {
      const url = isEditing ? `/api/lieux/${initialData.id}` : '/api/lieux'
      const method = isEditing ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin/lieux-admin')
        router.refresh()
      } else {
        const data = await res.json()
        alert(data.error || 'Erreur')
      }
    } catch (error) {
      alert('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Nom</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Région</label>
          <select name="region" value={formData.region} onChange={handleChange} className="w-full border rounded-md p-2">
            {Object.entries(RegionLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded-md p-2">
            {Object.entries(TypeLieuLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="number"
            step="any"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            type="number"
            step="any"
            name="lng"
            value={formData.lng}
            onChange={handleChange}
            required
            className="w-full border rounded-md p-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Images (URLs séparées par des virgules)</label>
        <input
          type="text"
          name="images"
          value={formData.images}
          onChange={handleChange}
          placeholder="/image1.jpg, /image2.jpg"
          className="w-full border rounded-md p-2"
        />
      </div>
      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : (isEditing ? 'Mettre à jour' : 'Créer')}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Annuler
        </Button>
      </div>
    </form>
  )
}