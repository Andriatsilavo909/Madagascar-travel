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

    // Récupérer le profil guide complet
    const guide = await prisma.guide.findFirst({
      where: { userId: session.user.id },
      select: {
        id: true,
        nom: true,
        prenom: true,
        telephone: true,
        specialite: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ 
      isGuide: !!guide, 
      guide: guide || null 
    });
  } catch (error) {
    console.error("Erreur API guide/profile:", error);
    return NextResponse.json({ 
      error: "Erreur serveur", 
      isGuide: false, 
      guide: null 
    }, { status: 500 });
  }
}