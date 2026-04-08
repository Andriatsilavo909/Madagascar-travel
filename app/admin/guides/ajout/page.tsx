'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AjoutGuidePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    circuit: '',
    dateNaissance: '',
    lieuNaissance: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/guides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Erreur')
      router.push('/admin/guides')
      router.refresh()
    } catch (error) {
      alert('Erreur lors de l’ajout')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Ajouter un guide</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <Label>Nom</Label>
          <Input name="nom" value={formData.nom} onChange={handleChange} required />
        </div>
        <div>
          <Label>Prénom</Label>
          <Input name="prenom" value={formData.prenom} onChange={handleChange} required />
        </div>
        <div>
          <Label>Adresse</Label>
          <Input name="adresse" value={formData.adresse} onChange={handleChange} required />
        </div>
        <div>
          <Label>Téléphone</Label>
          <Input name="telephone" value={formData.telephone} onChange={handleChange} required />
        </div>
        <div>
          <Label>Circuit</Label>
          <Input name="circuit" value={formData.circuit} onChange={handleChange} required />
        </div>
        <div>
          <Label>Date de naissance</Label>
          <Input name="dateNaissance" type="date" value={formData.dateNaissance} onChange={handleChange} required />
        </div>
        <div>
          <Label>Lieu de naissance</Label>
          <Input name="lieuNaissance" value={formData.lieuNaissance} onChange={handleChange} required />
        </div>
        <div className="flex gap-4">
          <Button type="submit" disabled={isLoading}>Enregistrer</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
        </div>
      </form>
    </div>
  )
}