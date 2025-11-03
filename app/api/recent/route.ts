import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, getIP } from "@/lib/rate";

export async function GET(req: Request) {
  const ip = getIP(req);
  const rl = rateLimit(ip);
  if (!rl.ok) return new Response("Too Many Requests", { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });

  const { searchParams } = new URL(req.url);
  const epicId = searchParams.get("epicId");
  const limitStr = searchParams.get("limit");
  const limit = limitStr ? parseInt(limitStr, 10) : 10;

  if (!epicId) {
    return NextResponse.json({ error: "epicId required" }, { status: 400 });
  }

  try {
    const matches = await prisma.matchSnapshot.findMany({
      where: { epicId },
      orderBy: { endedAt: "desc" },
      take: limit,
    });

    return NextResponse.json({ matches });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Failed to fetch matches" }, { status: 500 });
  }
}
