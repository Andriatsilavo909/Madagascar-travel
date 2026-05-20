'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function DeleteLieuButton({ id, lieuName }: { id: string; lieuName: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Supprimer le lieu "${lieuName}" ?`)) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/lieux?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      alert('Erreur réseau');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isLoading}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}