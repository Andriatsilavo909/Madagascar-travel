'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Guide {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  specialite: string;
  status: string;
}

export default function AdminGuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuides = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/guides');
      const data = await res.json();
      setGuides(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGuides(); }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer le guide "${name}" ?`)) return;
    await fetch(`http://localhost:4000/api/guides/${id}`, { method: 'DELETE' });
    fetchGuides();
  };

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des guides</h1>
        <Link href="/devenir-guide">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" /> Ajouter un guide
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spécialité</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {guides.map((guide) => (
              <tr key={guide.id}>
                <td className="px-6 py-4 whitespace-nowrap">{guide.nom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.prenom}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.telephone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.specialite}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    guide.status === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {guide.status === 'actif' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                  <Link href={`/admin/guides/${guide.id}/modifier`}>
                    <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(guide.id, `${guide.prenom} ${guide.nom}`)}>
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