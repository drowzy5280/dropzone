import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ items: [] });
  const items = await prisma.watchlist.findMany({ where: { userId: (session.user as any).id }, orderBy: { createdAt: "desc" }});
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { epicId, username } = await req.json();
  if (!epicId || !username) return NextResponse.json({ error: "epicId, username required" }, { status: 400 });
  const item = await prisma.watchlist.upsert({
    where: { userId_epicId: { userId: (session.user as any).id, epicId } },
    update: { username },
    create: { userId: (session.user as any).id, epicId, username },
  });
  return NextResponse.json({ item });
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { searchParams } = new URL(req.url);
  const epicId = searchParams.get("epicId");
  if (!epicId) return NextResponse.json({ error: "epicId required" }, { status: 400 });
  await prisma.watchlist.delete({ where: { userId_epicId: { userId: (session.user as any).id, epicId } } });
  return NextResponse.json({ ok: true });
}
