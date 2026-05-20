import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { nom, prenom, telephone, specialite, description } = body;

    const existing = await prisma.guide.findFirst({
      where: { userId: session.user.id }
    });

    if (existing) {
      return NextResponse.json({ error: "Vous êtes déjà guide" }, { status: 400 });
    }

    await prisma.guide.create({
      data: {
        userId: session.user.id,
        nom,
        prenom,
        telephone,
        specialite,
        description: description || "",
      },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: { role: "GUIDE" },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}