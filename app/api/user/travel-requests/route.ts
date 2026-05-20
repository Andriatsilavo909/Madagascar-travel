import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const demands = await prisma.demande.findMany({
    where: { email: session.user.email },
    orderBy: { createdAt: 'desc' }
  });
  return NextResponse.json(demands);
}