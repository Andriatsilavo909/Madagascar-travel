'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export default function DeleteGuideButton({ id, guideName }: { id: string; guideName: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Supprimer le guide ${guideName} ?`)) return;
    
    startTransition(async () => {
      try {
        const res = await fetch(`/api/guides?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
          router.refresh();
        } else {
          alert('Erreur lors de la suppression');
        }
      } catch (error) {
        alert('Erreur réseau');
      }
    });
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}