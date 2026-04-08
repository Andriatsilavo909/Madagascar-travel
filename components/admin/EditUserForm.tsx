'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function EditUserForm({ user }: { user: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({ name: user.name || '', email: user.email, role: user.role })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/users?id=${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        router.push('/admin/utilisateurs')
        router.refresh()
      } else {
        const err = await res.json()
        alert(err.error || 'Erreur')
      }
    } catch {
      alert('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-lg shadow space-y-4">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input id="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
      </div>
      <div>
        <Label>Rôle</Label>
        <Select value={data.role} onValueChange={(v) => setData({ ...data, role: v })}>
          <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="CLIENT">Client</SelectItem>
            <SelectItem value="ADMIN">Administrateur</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>Annuler</Button>
        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700">
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </Button>
      </div>
    </form>
  )
}