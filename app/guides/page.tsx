'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Phone, Mail } from 'lucide-react';

interface Guide {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  adresse: string;
  circuit: string;
  specialite: string;
  description: string;
  experience: string;
}

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/api/guides')
      .then(res => res.json())
      .then(data => {
        setGuides(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-500">Chargement des guides...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Nos guides locaux</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Découvrez nos guides professionnels qui vous accompagneront pour explorer Madagascar.
            Contactez-les directement pour organiser votre voyage.
          </p>
          <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {guides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun guide disponible pour le moment.</p>
            <Link href="/devenir-guide">
              <Button className="mt-4 bg-red-600 hover:bg-red-700">
                Devenir guide
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* En-tête de la carte */}
                <div className="bg-gradient-to-r from-red-500 to-red-600 px-5 py-3">
                  <h3 className="text-white font-bold text-lg">
                    {guide.prenom} {guide.nom}
                  </h3>
                  <div className="flex items-center gap-1 text-red-100 text-sm mt-1">
                    <Briefcase className="h-3 w-3" />
                    <span>{guide.specialite || 'Guide touristique'}</span>
                  </div>
                </div>

                {/* Corps de la carte */}
                <div className="p-5 space-y-3">
                  {/* Adresse */}
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Adresse</p>
                      <p className="text-sm text-gray-700">{guide.adresse || 'Non renseignée'}</p>
                    </div>
                  </div>

                  {/* Circuit */}
                  <div className="flex items-start gap-2">
                    <Briefcase className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Circuit proposé</p>
                      <p className="text-sm text-gray-700">{guide.circuit || guide.specialite || 'Circuit personnalisé'}</p>
                    </div>
                  </div>

                  {/* Expérience */}
                  {guide.experience && (
                    <div className="flex items-start gap-2">
                      <div className="h-4 w-4 text-red-500 flex-shrink-0">⭐</div>
                      <div>
                        <p className="text-xs text-gray-400">Expérience</p>
                        <p className="text-sm text-gray-700">{guide.experience}</p>
                      </div>
                    </div>
                  )}

                  {/* Description (tronquée) */}
                  {guide.description && (
                    <p className="text-sm text-gray-500 line-clamp-2 pt-2 border-t border-gray-100 mt-2">
                      {guide.description}
                    </p>
                  )}

                  {/* Bouton de contact (sans afficher le numéro) */}
                  <Button className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white">
                    <Mail className="h-4 w-4 mr-2" />
                    Contacter ce guide
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Appel à l'action pour devenir guide */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Vous êtes guide ?</h3>
          <p className="text-gray-500 mb-4">Rejoignez notre réseau et partagez votre passion de Madagascar</p>
          <Link href="/devenir-guide">
            <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-50">
              Devenir guide
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}