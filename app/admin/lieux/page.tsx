import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminGuidesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des guides</h1>
        <Link href="/admin/guides/ajout">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un guide
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">La liste des guides sera bientôt disponible.</p>
      </div>
    </div>
  );
}