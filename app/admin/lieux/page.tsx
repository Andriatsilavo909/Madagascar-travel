'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Lieu {
  id: string;
  nom: string;
  region: string;
  description: string;
  imagesArray: string[];
  type: string;
  createdBy?: { name: string; email: string };
}

export default function AdminLieuxPage() {
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLieux = async () => {
    try {
      // Appel au backend Express sur le port 4000
      const res = await fetch('http://localhost:4000/api/lieux');
      if (!res.ok) throw new Error('Erreur de chargement');
      const data = await res.json();
      setLieux(data);
    } catch (err) {
      setError('Erreur lors du chargement des lieux');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLieux();
  }, []);

  const handleDelete = async (id: string, nom: string) => {
    if (!confirm(`Supprimer le lieu "${nom}" ?`)) return;
    try {
      const res = await fetch(`http://localhost:4000/api/lieux/${id}`, { method: 'DELETE' });
      if (res.ok) fetchLieux();
      else alert('Erreur lors de la suppression');
    } catch (error) {
      alert('Erreur réseau');
    }
  };

  if (loading) return <div className="container py-12 text-center">Chargement...</div>;
  if (error) return <div className="container py-12 text-center text-red-600">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des lieux</h1>
        <Link href="/admin/lieux/ajout">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" /> Ajouter un lieu
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Région</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Créé par</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lieux.map((lieu) => (
              <tr key={lieu.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {lieu.imagesArray?.[0] ? (
                    <img src={lieu.imagesArray[0]} alt={lieu.nom} className="h-10 w-10 object-cover rounded" />
                  ) : <div className="h-10 w-10 bg-gray-200 rounded" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">{lieu.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lieu.region}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lieu.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lieu.createdBy?.name || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Link href={`/admin/lieux/${lieu.id}/modifier`}>
                    <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(lieu.id, lieu.nom)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}