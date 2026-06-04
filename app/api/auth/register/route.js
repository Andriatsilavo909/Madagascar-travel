import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, adminKey } = body;

    console.log("📝 Données reçues:", { name, email, adminKey });

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Champs requis" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Vérification du code admin via variable d'environnement
    const isAdmin = adminKey && adminKey === process.env.ADMIN_SECRET_KEY;
    const role = isAdmin ? "ADMIN" : (body.role === "GUIDE" ? "GUIDE" : "CLIENT");

    console.log("👑 Rôle attribué:", role);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: phone || null,
        role: role,
      },
    });

    return NextResponse.json({ message: "Compte créé", role: user.role, redirect: user.role === "ADMIN" ? "/admin/dashboard" : user.role === "GUIDE" ? "/guide/dashboard" : "/auth/signin" }, { status: 201 });
  } catch (error) {
    console.error("❌ Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}