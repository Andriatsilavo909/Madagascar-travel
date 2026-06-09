import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";

async function getGuides() {
  try {
    const res = await fetch("http://localhost:4000/api/guides", { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch { return []; }
}

export default async function GuidesPublicsPage() {
  const guides = await getGuides();
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Nos guides locaux</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide: any) => (
          <div key={guide.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-5 py-3">
              <h3 className="text-white font-bold text-lg">{guide.prenom} {guide.nom}</h3>
              <div className="flex items-center gap-1 text-red-100 text-sm mt-1">
                <Briefcase className="h-3 w-3" />
                <span>{guide.specialite || "Guide touristique"}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>{guide.adresse || "Madagascar"}</span>
              </div>
              {guide.description && <p className="text-sm text-gray-600 line-clamp-2">{guide.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
