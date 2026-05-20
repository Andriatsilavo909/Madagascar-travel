import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const guide = await prisma.guide.findFirst({
      where: { userId: session.user.id }
    });

    if (!guide) {
      return NextResponse.json([]);
    }

    const bookings = await prisma.booking.findMany({
      where: { guideId: guide.id },
      include: { client: { select: { name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Erreur API guide/bookings GET:", error);
    return NextResponse.json([]);
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { id, status } = await request.json();
    const booking = await prisma.booking.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Erreur API guide/bookings PUT:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}