import { prisma } from "@/lib/db/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";
import { parseImages } from "@/types/lieu";

async function getLieux() {
  const lieux = await prisma.lieu.findMany({
    orderBy: { createdAt: 'desc' },
    include: { createdBy: { select: { name: true, email: true } } }
  });
  
  return lieux.map(lieu => ({
    ...lieu,
    imagesArray: parseImages(lieu.images)
  }));
}

export default async function AdminLieuxPage() {
  const lieux = await getLieux();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>Gestion des lieux</h1>
        <Link href="/admin/lieux/ajout">
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un lieu
          </Button>
        </Link>
      </div>

      {lieux.length === 0 ? (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', padding: '2rem', textAlign: 'center', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <p style={{ color: '#6b7280' }}>Aucun lieu enregistré pour le moment.</p>
          <Link href="/admin/lieux/ajout">
            <Button className="mt-4 bg-red-600 hover:bg-red-700">
              Ajouter votre premier lieu
            </Button>
          </Link>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', overflowX: 'auto', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
          <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'medium', color: '#6b7280', textTransform: 'uppercase' }}>Image</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'medium', color: '#6b7280', textTransform: 'uppercase' }}>Nom</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'medium', color: '#6b7280', textTransform: 'uppercase' }}>Région</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'medium', color: '#6b7280', textTransform: 'uppercase' }}>Type</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'medium', color: '#6b7280', textTransform: 'uppercase' }}>Créé par</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'right', fontSize: '0.75rem', fontWeight: 'medium', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lieux.map((lieu) => {
                const imageUrl = lieu.imagesArray && lieu.imagesArray.length > 0 ? lieu.imagesArray[0] : null;
                return (
                  <tr key={lieu.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                      {imageUrl ? (
                        <img src={imageUrl} alt={lieu.nom} style={{ height: '2.5rem', width: '2.5rem', objectFit: 'cover', borderRadius: '0.25rem' }} />
                      ) : (
                        <div style={{ height: '2.5rem', width: '2.5rem', backgroundColor: '#e5e7eb', borderRadius: '0.25rem' }} />
                      )}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', fontWeight: '500' }}>{lieu.nom}</td>
                    <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>{lieu.region}</td>
                    <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>{lieu.type}</td>
                    <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>{lieu.createdBy?.name || '-'}</td>
                    <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
                      <Link href={`/admin/lieux/${lieu.id}/modifier`} style={{ marginRight: '0.5rem' }}>
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteLieuButton id={lieu.id} lieuName={lieu.nom} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}