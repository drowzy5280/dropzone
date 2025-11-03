import { NextResponse } from "next/server";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { matchId, content } = await req.json();
  if (!matchId || !content) return NextResponse.json({ error: "matchId and content required" }, { status: 400 });
  const note = await prisma.matchNote.create({ data: { userId: (session.user as any).id, matchId, content } });
  return NextResponse.json({ note });
}

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ notes: [] });
  const { searchParams } = new URL(req.url);
  const matchId = searchParams.get("matchId");
  if (!matchId) return NextResponse.json({ notes: [] });
  const notes = await prisma.matchNote.findMany({ where: { userId: (session.user as any).id, matchId }, orderBy: { createdAt: "desc" }});
  return NextResponse.json({ notes });
}
