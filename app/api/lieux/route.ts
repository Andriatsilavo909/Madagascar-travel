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

// GET : Récupérer tous les lieux (PUBLIC) avec support multilingue
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')
    const type = searchParams.get('type')
    const search = searchParams.get('search')
    const locale = searchParams.get('locale') || 'fr' // ← AJOUTÉ

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
        translations: {
          where: { locale }  // ← AJOUTÉ - filtre les traductions
        },
        createdBy: {
          select: { id: true, name: true, email: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Transformer les données avec la traduction
    const lieuxWithArrays = lieux.map(lieu => {
      const translation = lieu.translations[0]
      return {
        id: lieu.id,
        nom: translation?.nom || lieu.nom,
        description: translation?.description || lieu.description,
        images: lieu.images,
        imagesArray: parseImages(lieu.images),
        lat: lieu.lat,
        lng: lieu.lng,
        type: lieu.type,
        region: lieu.region,
        createdBy: lieu.createdBy,
        createdAt: lieu.createdAt,
        updatedAt: lieu.updatedAt,
      }
    })

    return NextResponse.json(lieuxWithArrays)
  } catch (error) {
    console.error("Erreur GET /api/lieux:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des lieux" },
      { status: 500 }
    )
  }
}

// POST : Créer un lieu (ADMIN uniquement)
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

    if (!nom || !region || !description || !imagesArray || !lat || !lng || !type) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      )
    }

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

// PUT : Mettre à jour un lieu (ADMIN uniquement)
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

// DELETE : Supprimer un lieu (ADMIN uniquement)
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

    await prisma.lieu.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Erreur DELETE /api/lieux:", error)
    return NextResponse.json(
      { error: "Erreur lors de la suppression du lieu" },
      { status: 500 }
    )
  }
}