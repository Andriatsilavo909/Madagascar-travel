'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RegionLabels, TypeLieuLabels } from '@/types/lieu'

export default function AjoutLieuPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    region: 'ANTANANARIVO',
    description: '',
    imagesArray: [''],
    lat: '',
    lng: '',
    type: 'CULTUREL',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.imagesArray]
    newImages[index] = value
    setFormData(prev => ({ ...prev, imagesArray: newImages }))
  }

  const addImageField = () => {
    setFormData(prev => ({ ...prev, imagesArray: [...prev.imagesArray, ''] }))
  }

  const removeImageField = (index: number) => {
    if (formData.imagesArray.length > 1) {
      const newImages = formData.imagesArray.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, imagesArray: newImages }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/lieux', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
        }),
      })

      if (res.ok) {
        router.push('/admin/lieux')
      } else {
        const data = await res.json()
        alert(data.error || 'Erreur lors de la création')
      }
    } catch (error) {
      alert('Erreur réseau')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ajouter un lieu</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Région</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {Object.entries(RegionLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {Object.entries(TypeLieuLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="number"
            step="any"
            name="lat"
            value={formData.lat}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Images (URLs)</label>
          {formData.imagesArray.map((img, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="https://..."
                className="flex-1 p-2 border rounded"
              />
              {formData.imagesArray.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImageField(index)}
                >
                  Supprimer
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addImageField}>
            Ajouter une image
          </Button>
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isLoading} className="bg-red-600 hover:bg-red-700">
            {isLoading ? 'Création...' : 'Créer le lieu'}
          </Button>
        </div>
      </form>
    </div>
  )
}