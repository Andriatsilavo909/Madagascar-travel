import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface PageProps {
  params: Promise<{ region: string }>;
}

async function getLieuxByRegion(region: string) {
  try {
    const res = await fetch(`http://localhost:4000/api/lieux?region=${region}`, { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch { return []; }
}

export default async function RegionPage({ params }: PageProps) {
  const { region } = await params;
  const lieux = await getLieuxByRegion(region);

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8 capitalize">{region.replace(/_/g, " ")}</h1>
      {lieux.length === 0 ? (
        <p className="text-gray-500">Aucun lieu disponible pour cette région.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lieux.map((lieu: any) => (
            <div key={lieu.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                {lieu.imagesArray?.[0] && (
                  <img src={lieu.imagesArray[0]} alt={lieu.nom} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{lieu.nom}</h2>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />{lieu.region}
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{lieu.description}</p>
                <Link href={`/lieux/${lieu.id}`}>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Voir details</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}