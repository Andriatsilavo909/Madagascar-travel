import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Fonctionnalité de réservation non encore disponible" },
    { status: 501 }
  );
}

export async function GET() {
  return NextResponse.json([]);
}