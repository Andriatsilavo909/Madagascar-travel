import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Données reçues :", body);
    const { nom, email, message } = body;

    if (!nom || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const demande = await prisma.demande.create({
      data: { nom, email, message, status: "en_attente" },
    });

    return NextResponse.json(
      { success: true, message: "Demande enregistrée", demande },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur API contact :", error);
    return NextResponse.json(
      { error: "Erreur serveur : " + (error.message || "inconnue") },
      { status: 500 }
    );
  }
}