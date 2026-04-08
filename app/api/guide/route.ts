import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/authOptions"

export async function POST(request: Request) {
  try {
    // Vérifier que l'utilisateur est admin (facultatif si vous voulez que ce soit public)
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { nom, prenom, adresse, telephone, circuit, dateNaissance, lieuNaissance } = body

    // Validation simple
    if (!nom || !prenom || !adresse || !telephone || !circuit || !dateNaissance || !lieuNaissance) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    // Créer le guide
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
    })

    return NextResponse.json(guide, { status: 201 })
  } catch (error) {
    console.error("Erreur création guide:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// Optionnel : GET pour lister les guides (si besoin)
export async function GET() {
  try {
    const guides = await prisma.guide.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(guides)
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération" },
      { status: 500 }
    )
  }
}