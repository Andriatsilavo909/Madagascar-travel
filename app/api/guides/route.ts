import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// GET : Récupérer tous les guides (public)
export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(guides);
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la récupération" }, { status: 500 });
  }
}

// POST : Créer un guide (ADMIN uniquement)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { nom, prenom, telephone, specialite, description, userId } = body;

    if (!nom || !prenom || !telephone || !specialite) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const guide = await prisma.guide.create({
      data: {
        userId: userId || session.user.id,
        nom,
        prenom,
        telephone,
        specialite,
        description: description || "",
      },
    });

    return NextResponse.json(guide, { status: 201 });
  } catch (error) {
    console.error("Erreur POST /api/guides:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// PUT : Mettre à jour un guide (ADMIN uniquement)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    const body = await request.json();
    const { nom, prenom, telephone, specialite, description, status } = body;

    const guide = await prisma.guide.update({
      where: { id },
      data: {
        nom,
        prenom,
        telephone,
        specialite,
        description,
        status,
      },
    });

    return NextResponse.json(guide);
  } catch (error) {
    console.error("Erreur PUT /api/guides:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE : Supprimer un guide (ADMIN uniquement)
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    await prisma.guide.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur DELETE /api/guides:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}