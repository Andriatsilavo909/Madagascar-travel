import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: { clientId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: { guide: { select: { nom: true, prenom: true } } }
    });
    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Erreur API bookings:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}