import { NextResponse } from "next/server";
import { getEpicId, getPlayerStats } from "@/lib/fortnite";
import { prisma } from "@/lib/prisma";
import { toBucket, inferPlacementBucket } from "@/lib/placement";
import { rateLimit, getIP } from "@/lib/rate";

export async function GET(req: Request) {
  const ip = getIP(req);
  const rl = rateLimit(ip);
  if (!rl.ok) return new Response("Too Many Requests", { status: 429, headers: { "Retry-After": String(rl.retryAfter) } });

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  if (!username) return NextResponse.json({ error: "username required" }, { status: 400 });

  try {
    const { epicId, username: resolvedName } = await getEpicId(username);
    const stats = await getPlayerStats(epicId);

    const snap = await prisma.playerSnapshot.create({
      data: {
        epicId,
        username: resolvedName ?? stats.username,
        mode: stats.mode,
        matches: stats.matches,
        wins: stats.wins,
        kills: stats.kills,
        kd: stats.kd,
        winRate: stats.winRate,
        top10Rate: stats.top10Rate ?? null,
        avgPlacement: stats.avgPlacement ?? null,
        platform: stats.platform ?? null,
        period: "lifetime",
        raw: JSON.stringify(stats.raw)
      }
    });

    const prev = await prisma.playerSnapshot.findFirst({ where: { epicId }, orderBy: { createdAt: "desc" }, skip: 1 });

    if (prev && typeof prev.matches === "number" && stats.matches > prev.matches) {
      const deltaMatches = stats.matches - prev.matches;
      const deltaKills = Math.max(0, stats.kills - (prev.kills ?? 0));
      const deltaWins = Math.max(0, stats.wins - (prev.wins ?? 0));

      const matchesToRecord = Math.min(deltaMatches, 5);
      const baseKills = Math.floor(deltaKills / matchesToRecord);
      let remainder = deltaKills % matchesToRecord;
      const winsToAssign = Math.min(deltaWins, matchesToRecord);

      const useHeuristic = String(process.env.EXPERIMENTAL_INFER_PLACEMENT).toLowerCase() === "true";
      const now = Date.now();

      for (let i = 0; i < matchesToRecord; i++) {
        const k = baseKills + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;

        const isWin = i >= matchesToRecord - winsToAssign;

        // We do NOT know exact placement yet; this is where you'd set 'placement'
        // from a provider if you add that later (e.g., exactPlacement = ...).
        const exactPlacement: number | undefined = undefined;

        // Decide bucket
        let placementBucket: string | undefined = undefined;
        let placementSource: string | undefined = undefined;

        if (typeof exactPlacement === "number") {
          placementBucket = toBucket(exactPlacement);
          placementSource = "provider";
        } else if (useHeuristic) {
          placementBucket = inferPlacementBucket({ isWin, kills: k });
          placementSource = "heuristic";
        }

        await prisma.matchSnapshot.create({
          data: {
            epicId,
            username: resolvedName ?? stats.username,
            endedAt: new Date(now - (matchesToRecord - 1 - i) * 15_000),
            kills: k,
            win: !!isWin,
            placement: exactPlacement ?? null,
            placementBucket: (placementBucket as any) ?? null,
            placementSource: placementSource ?? null,
            matchesAfter: stats.matches,
            winsAfter: stats.wins,
            raw: JSON.stringify({ prev, now: snap, slot: i + 1, matchesToRecord, deltaKills, deltaWins }),
          },
        });
      }
    }

    return NextResponse.json({ ...stats, username: resolvedName ?? stats.username });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Lookup failed" }, { status: 500 });
  }
}
