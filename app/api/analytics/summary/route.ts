import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  computeWinStreak, computeKillStreak, dailySplit, gradesFromRecent,
  radarScores, timeOfDayBuckets, highlights, modeBadgeFromHeuristics
} from "@/lib/metrics";
import { rateLimit, getIP } from "@/lib/rate";

export async function GET(req: Request) {
  const ip = getIP(req);
  const rl = rateLimit(ip);
  if (!rl.ok) return new Response("Too Many Requests", { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });

  const { searchParams } = new URL(req.url);
  const epicId = searchParams.get("epicId");
  const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 200);
  if (!epicId) return NextResponse.json({ error: "epicId required" }, { status: 400 });

  // Recent matches (already present)
  const rows = await prisma.matchSnapshot.findMany({
    where: { epicId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
  const recent = rows.map(r => ({ id: r.id, endedAt: r.endedAt, kills: r.kills ?? 0, win: !!r.win }));

  // NEW: last 20 player snapshots to compute trend chips
  const snaps = await prisma.playerSnapshot.findMany({
    where: { epicId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  // Split into last10 vs prev10
  const last10 = snaps.slice(0, 10);
  const prev10 = snaps.slice(10, 20);

  function avg(arr: number[]) { return arr.length ? arr.reduce((s,v)=>s+v,0)/arr.length : 0; }

  const lastKillsAvg  = avg(last10.map(s => s.kills ?? 0)) / Math.max(1, avg(last10.map(s => (s.matches ?? 1))));
  const prevKillsAvg  = avg(prev10.map(s => s.kills ?? 0)) / Math.max(1, avg(prev10.map(s => (s.matches ?? 1))));

  const lastKD        = avg(last10.map(s => s.kd ?? 0));
  const prevKD        = avg(prev10.map(s => s.kd ?? 0));

  const lastWR        = avg(last10.map(s => s.winRate ?? 0)); // already in percent
  const prevWR        = avg(prev10.map(s => s.winRate ?? 0));

  const kdDelta10         = Number((lastKD - prevKD).toFixed(2));
  const winRateDelta10    = Number((lastWR - prevWR).toFixed(1));
  const killsAvgDelta10   = Number((lastKillsAvg - prevKillsAvg).toFixed(2));

  const streaks = { win: computeWinStreak(recent), kill: computeKillStreak(recent) };
  const today   = dailySplit(recent);
  const grades  = gradesFromRecent(recent);
  const radar   = radarScores(recent);
  const times   = timeOfDayBuckets(recent);
  const hl      = highlights(recent);
  const badge   = modeBadgeFromHeuristics(recent);

  return NextResponse.json({
    streaks, today, grades, radar, times, highlights: hl, modeBadge: badge,
    recentCount: recent.length,
    trends: { kdDelta10, winRateDelta10, killsAvgDelta10 }
  });
}
