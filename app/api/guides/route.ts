import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// GET : liste publique des guides
export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { nom: 'asc' }
    });
    return NextResponse.json(guides);
  } catch (error) {
    console.error("Erreur GET guides:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// POST : création d'un guide (admin uniquement)
export async function POST(request: Request) {
  try {
    // Vérification admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { nom, prenom, adresse, telephone, circuit, dateNaissance, lieuNaissance } = body;

    // Validation des champs requis
    if (!nom || !prenom || !adresse || !telephone || !circuit || !dateNaissance || !lieuNaissance) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const guide = await prisma.guide.create({
      data: {
        nom,
        prenom,
        adresse,
        telephone,
        circuit,
        dateNaissance: new Date(dateNaissance),
        lieuNaissance,
      },
    });

    return NextResponse.json(guide, { status: 201 });
  } catch (error) {
    console.error("Erreur création guide:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}