import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import EditGuideForm from "@/components/admin/EditGuideForm";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

async function getGuide(id: string) {
  const guide = await prisma.guide.findUnique({ where: { id } });
  if (!guide) return null;
  return guide;
}

export default async function ModifierGuidePage({ params }: PageProps) {
  const { id } = await params;
  const guide = await getGuide(id);

  if (!guide) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Modifier le guide</h1>
      <EditGuideForm guide={guide} />
    </div>
  );
}