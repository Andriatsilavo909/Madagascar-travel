import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { parseImages } from "@/types/lieu";
import EditLieuForm from "@/components/admin/EditLieuForm";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

async function getLieu(id: string) {
  const lieu = await prisma.lieu.findUnique({ where: { id } });
  if (!lieu) return null;
  return {
    ...lieu,
    imagesArray: parseImages(lieu.images)
  };
}

export default async function ModifierLieuPage({ params }: PageProps) {
  const { id } = await params;
  const lieu = await getLieu(id);

  if (!lieu) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Modifier le lieu</h1>
      <EditLieuForm lieu={lieu} />
    </div>
  );
}