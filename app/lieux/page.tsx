'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface Lieu {
  id: string;
  nom: string;
  region: string;
  description: string;
  imagesArray: string[];
  type: string;
}

export default function LieuxPage() {
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLieux = async () => {
      try {
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
    fetchLieux();
  }, []);

  if (loading) {
    return <div className="container py-12 text-center">Chargement...</div>;
  }

  if (error) {
    return <div className="container py-12 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-4">Tous les lieux</h1>
      <p className="text-gray-600 mb-8">
        Découvrez {lieux.length} lieux touristiques à Madagascar
      </p>

      {lieux.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Aucun lieu disponible pour le moment</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lieux.map((lieu) => (
            <div key={lieu.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="h-48 bg-gray-200">
                {lieu.imagesArray && lieu.imagesArray.length > 0 ? (
                  <img 
                    src={lieu.imagesArray[0]} 
                    alt={lieu.nom} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Image non disponible
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold">{lieu.nom}</h2>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                    {lieu.type}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {lieu.region}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{lieu.description}</p>
                <Link href={`/lieux/${lieu.id}`}>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Voir détails
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}