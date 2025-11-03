import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { username, epicId } = await req.json().catch(() => ({}));
  if (!username || !epicId) return NextResponse.json({ error: "username and epicId required" }, { status: 400 });

  await prisma.externalLink.upsert({
    where: { userId_provider: { userId: session.user.id, provider: "epic" } },
    update: { accountId: epicId, username },
    create: { userId: session.user.id, provider: "epic", accountId: epicId, username }
  });

  return NextResponse.json({ ok: true });
}
