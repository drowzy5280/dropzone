import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCoachingPlan } from "@/lib/coach";
import { getPlayerStats } from "@/lib/fortnite";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { epicId, username } = body as { epicId: string; username?: string };
  if (!epicId) return NextResponse.json({ error: "epicId required" }, { status: 400 });

  const stats = await getPlayerStats(epicId);
  const plan = generateCoachingPlan(stats);

  const created = await prisma.coachingPlan.create({
    data: { epicId, username: username ?? stats.username, tier: "free", summary: plan.summary, modules: JSON.stringify(plan.modules) }
  });

  return NextResponse.json({ planId: created.id });
}
