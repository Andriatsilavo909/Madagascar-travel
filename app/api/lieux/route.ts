import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/authOptions"

// Fonctions utilitaires pour parser / stringifier les images
function parseImages(imagesJson: string): string[] {
  try {
    return JSON.parse(imagesJson) || []
  } catch {
    return []
  }
}

function stringifyImages(images: string[]): string {
  return JSON.stringify(images)
}

// GET : Récupérer tous les lieux (public) avec filtres optionnels
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')
    const type = searchParams.get('type')
    const search = searchParams.get('search')

    const where: any = {}
    if (region) where.region = region
    if (type) where.type = type
    if (search) {
      where.OR = [
        { nom: { contains: search } },
        { description: { contains: search } },
      ]
    }

    const lieux = await prisma.lieu.findMany({
      where,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transformer les images JSON en tableau pour le client
    const lieuxWithArrays = lieux.map(lieu => ({
      ...lieu,
      imagesArray: parseImages(lieu.images)
    }))

    return NextResponse.json(lieuxWithArrays)
  } catch (error) {
    console.error("Erreur GET /api/lieux:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des lieux" },
      { status: 500 }
    )
  }
}

// POST : Créer un nouveau lieu (admin uniquement)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Non autorisé - Vous devez être administrateur" },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { nom, region, description, imagesArray, lat, lng, type } = data

    // Validation basique
    if (!nom || !region || !description || !imagesArray || !lat || !lng || !type) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

    // Convertir le tableau d'images en JSON pour stockage
    const imagesJson = stringifyImages(imagesArray)

    const newLieu = await prisma.lieu.create({
      data: {
        nom,
        region,
        description,
        images: imagesJson,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        type,
        createdById: session.user.id,
      },
    })

    return NextResponse.json(newLieu, { status: 201 })
  } catch (error) {
    console.error("Erreur POST /api/lieux:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création du lieu" },
      { status: 500 }
    )
  }
}

// PUT : Mettre à jour un lieu existant (admin uniquement)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Non autorisé - Vous devez être administrateur" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: "ID du lieu manquant" },
        { status: 400 }
      )
    }

    const data = await request.json()
    const { nom, region, description, imagesArray, lat, lng, type } = data

    // Préparer les données à mettre à jour
    const updateData: any = {}
    if (nom) updateData.nom = nom
    if (region) updateData.region = region
    if (description) updateData.description = description
    if (imagesArray) updateData.images = stringifyImages(imagesArray)
    if (lat) updateData.lat = parseFloat(lat)
    if (lng) updateData.lng = parseFloat(lng)
    if (type) updateData.type = type

    const updatedLieu = await prisma.lieu.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(updatedLieu)
  } catch (error) {
    console.error("Erreur PUT /api/lieux:", error)
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du lieu" },
      { status: 500 }
    )
  }
}

// DELETE : Supprimer un lieu (admin uniquement)
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: "Non autorisé - Vous devez être administrateur" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: "ID du lieu manquant" },
        { status: 400 }
      )
    }

    await prisma.lieu.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur DELETE /api/lieux:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression du lieu" },
      { status: 500 }
    )
  }
}