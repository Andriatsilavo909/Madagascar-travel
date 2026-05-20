import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, adminKey, role, guideData } = body;

    // Validation...
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Déterminer le rôle (admin via adminKey)
    const adminSecret = process.env.ADMIN_SECRET_KEY;
    let userRole = role === 'GUIDE' ? 'GUIDE' : 'CLIENT';
    if (adminSecret && adminKey === adminSecret) {
      userRole = 'ADMIN';
    }

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        role: userRole,
      },
    });

    // Si guide, créer le profil guide
    if (role === 'GUIDE' && guideData) {
      await prisma.guide.create({
        data: {
          userId: user.id,
          nom: guideData.nom,
          prenom: guideData.prenom,
          telephone: guideData.telephone,
          email: guideData.email || null,
          langues: guideData.langues || "",
          diplomes: guideData.diplomes || "",
          experience: guideData.experience || "",
          specialites: guideData.specialites || "",
          description: guideData.description || "",
          status: "actif",
        },
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json({ message: "Compte créé", user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error("Erreur inscription:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}