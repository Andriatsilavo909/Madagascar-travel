import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const guides = await prisma.guide.findMany();
    return NextResponse.json({ count: guides.length, guides });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}