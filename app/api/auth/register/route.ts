import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"

// Définir une interface pour le corps de la requête
interface RegisterBody {
  name: string
  email: string
  password: string
  phone?: string
  adminKey?: string
}

export async function POST(request: Request) {
  try {
    // Typer le body avec l'interface
    const body: RegisterBody = await request.json()
    const { name, email, password, phone, adminKey } = body

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nom, email et mot de passe requis" },
        { status: 400 }
      )
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      )
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    // Lire la clé secrète depuis l'environnement
    const adminSecret = process.env.ADMIN_SECRET_KEY

    // Déterminer le rôle (en ignorant les espaces éventuels)
    const role = (adminSecret && adminKey && adminKey.trim() === adminSecret.trim())
      ? "ADMIN"
      : "CLIENT"

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        role,
      }
    })

    // Ne pas renvoyer le mot de passe
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { message: "Compte créé avec succès", user: userWithoutPassword },
      { status: 201 }
    )
  } catch (error) {
    console.error("Erreur inscription :", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}