'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface Guide {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  specialite: string;
  status: string;
}

export default function AdminGuideRequestsPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuides = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/guides');
      const data = await res.json();
      setGuides(data.filter((g: Guide) => g.status === 'en_attente'));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGuides(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`http://localhost:4000/api/guides/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    fetchGuides();
  };

  if (loading) return <div className="text-center py-12">Chargement...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Demandes de devenir guide</h1>
      {guides.length === 0 ? (
        <p className="text-gray-500">Aucune demande en attente.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Téléphone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spécialité</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guides.map((guide) => (
                <tr key={guide.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.prenom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.telephone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.email || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{guide.specialite}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() => updateStatus(guide.id, 'approuve')}>
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => updateStatus(guide.id, 'refuse')}>
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}