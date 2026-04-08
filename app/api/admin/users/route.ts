import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/authOptions"

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 })

    const { name, email, role } = await request.json()
    if (!email || !role) return NextResponse.json({ error: "Email et rôle requis" }, { status: 400 })

    // Vérifier unicité email
    const existing = await prisma.user.findFirst({ where: { email, NOT: { id } } })
    if (existing) return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 })

    const updated = await prisma.user.update({ where: { id }, data: { name, email, role } })
    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 })

    if (id === session.user.id) {
      return NextResponse.json({ error: "Vous ne pouvez pas supprimer votre propre compte" }, { status: 400 })
    }

    await prisma.user.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}