import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { guideId, startDate, endDate, totalAmount } = await request.json();
    if (!guideId || !startDate || !endDate || !totalAmount) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        clientId: session.user.id,
        guideId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalAmount,
        status: "en_attente",
      },
    });

    // Optionnel : notifier l'admin (créer une notification)
    const admins = await prisma.user.findMany({ where: { role: 'ADMIN' } });
    for (const admin of admins) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          title: "Nouvelle réservation",
          message: `L'utilisateur ${session.user.name} a demandé un guide du ${startDate} au ${endDate}.`,
          type: "booking",
        },
      });
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// Optionnel : GET pour lister les réservations d'un client
export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    where: { clientId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(bookings);
}