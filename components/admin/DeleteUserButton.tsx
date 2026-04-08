'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export default function DeleteUserButton({ userId, userEmail }: { userId: string; userEmail: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Supprimer l'utilisateur ${userEmail} ?`)) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/admin/users?id=${userId}`, { method: 'DELETE' })
      if (res.ok) router.refresh()
      else alert('Erreur lors de la suppression')
    } catch {
      alert('Erreur réseau')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isLoading}>
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}