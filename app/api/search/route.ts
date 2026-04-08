import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json([]);
    }

    const lieux = await prisma.lieu.findMany({
      where: {
        OR: [
          { nom: { contains: query } },
          { description: { contains: query } },
          { region: { contains: query } },
        ],
      },
      take: 10,
      select: { id: true, nom: true, region: true, type: true, images: true },
    });

    return NextResponse.json(lieux);
  } catch (error) {
    console.error("Erreur search API:", error);
    return NextResponse.json({ error: "Erreur lors de la recherche" }, { status: 500 });
  }
}