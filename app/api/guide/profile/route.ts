import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ isGuide: false, guide: null });
}