import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    if (!query || query.length < 2) return NextResponse.json([]);
    const res = await fetch(`http://localhost:4000/api/lieux?search=${encodeURIComponent(query)}`);
    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data.slice(0, 10) : []);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
