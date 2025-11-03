import dayjs from "dayjs";

export type RecentMatch = { id: string; endedAt: string | Date; kills: number; win: boolean; };

export function computeWinStreak(matches: RecentMatch[]): number {
  let s = 0;
  for (const m of matches) { if (m.win) s++; else break; }
  return s;
}

export function computeKillStreak(matches: RecentMatch[]): number {
  // Sum kills from last N matches until a very low kill game breaks momentum
  let s = 0;
  for (const m of matches) {
    if (m.kills <= 1 && !m.win) break;
    s += m.kills;
  }
  return s;
}

export function trendDelta(a: number, b: number) {
  // return signed delta, with small rounding
  const d = b - a;
  return Math.round(d * 100) / 100;
}

export function dailySplit(matches: RecentMatch[]) {
  const start = dayjs().startOf("day");
  const end = dayjs().endOf("day");
  const today = matches.filter(m => dayjs(m.endedAt).isAfter(start) && dayjs(m.endedAt).isBefore(end));
  const totals = today.reduce((acc, m) => {
    acc.matches++; acc.kills += m.kills; if (m.win) acc.wins++;
    return acc;
  }, { matches: 0, wins: 0, kills: 0 });
  const kd = totals.matches ? totals.kills / Math.max(1, totals.matches - totals.wins) : 0;
  return { ...totals, kd: Number(kd.toFixed(2)) };
}

export function gradesFromRecent(matches: RecentMatch[]) {
  // simple thresholds; tweak later
  const last10 = matches.slice(0, 10);
  const killsAvg = last10.length ? last10.reduce((s,m)=>s+m.kills,0)/last10.length : 0;
  const wins = last10.filter(m=>m.win).length;
  const kdApprox = killsAvg / Math.max(0.5, 1 - wins/Math.max(1, last10.length)); // playful approx

  const grade = (v:number, tiers:[number,string][]) => {
    for (const [t, g] of tiers) if (v >= t) return g;
    return "D";
  };

  return {
    placement: grade(wins, [[0.5,"A"],[0.3,"B"],[0.15,"C"]]),
    kd: grade(kdApprox, [[3,"A"],[2,"B"],[1,"C"]]),
    aggression: grade(killsAvg, [[6,"A"],[3,"B"],[1.5,"C"]]),
    consistency: grade(1 - variance(last10.map(m=>m.kills)), [[0.9,"A"],[0.75,"B"],[0.6,"C"]]),
  };
}

function variance(arr:number[]) {
  if (!arr.length) return 0;
  const avg = arr.reduce((s,v)=>s+v,0)/arr.length;
  return arr.reduce((s,v)=>s+(v-avg)*(v-avg),0)/arr.length;
}

export function radarScores(matches: RecentMatch[]) {
  const last20 = matches.slice(0,20);
  const killsAvg = last20.length ? last20.reduce((s,m)=>s+m.kills,0)/last20.length : 0;
  const winRate = last20.length ? last20.filter(m=>m.win).length / last20.length : 0;

  // 0..100 scales
  const aggression = clamp01(killsAvg/6)*100; // 6 kills avg = 100
  const survival = clamp01(winRate/0.25)*100; // 25% win = 100 (optimistic)
  const rotation = clamp01( (survival*0.6 + aggression*0.4) / 100 )*100; // placeholder
  const gameSense = clamp01( (survival*0.7 + (1-variance(last20.map(m=>m.kills)))*30 )/100 )*100;
  const consistency = clamp01( 1-variance(last20.map(m=>m.kills)) )*100;

  return { aggression: round(aggression), survival: round(survival), rotation: round(rotation), gameSense: round(gameSense), consistency: round(consistency) };
}

function clamp01(n:number){ return Math.max(0, Math.min(1, n)); }
function round(n:number){ return Math.round(n); }

export function timeOfDayBuckets(matches: RecentMatch[]) {
  // returns map { morning, afternoon, evening, night }
  const buckets: Record<string, RecentMatch[]> = { morning: [], afternoon: [], evening: [], night: [] };
  for (const m of matches) {
    const h = dayjs(m.endedAt).hour();
    const key = h < 12 ? "morning" : h < 17 ? "afternoon" : h < 22 ? "evening" : "night";
    buckets[key].push(m);
  }
  const score = (arr: RecentMatch[]) => {
    if (!arr.length) return { matches: 0, kd: 0, winRate: 0 };
    const wins = arr.filter(m=>m.win).length;
    const kills = arr.reduce((s,m)=>s+m.kills,0);
    const kd = kills / Math.max(1, arr.length - wins);
    return { matches: arr.length, kd: Number(kd.toFixed(2)), winRate: Number((wins/arr.length*100).toFixed(1)) };
  };
  return {
    morning: score(buckets.morning),
    afternoon: score(buckets.afternoon),
    evening: score(buckets.evening),
    night: score(buckets.night),
  };
}

export function highlights(matches: RecentMatch[]) {
  const last = matches[0];
  const out: string[] = [];
  if (!last) return out;
  if (last.kills >= 10 && last.win) out.push("🎉 Monster win: 10+ kills & Victory Royale!");
  else if (last.kills >= 8) out.push("💥 Pop-off game: 8+ kills!");
  if (!last.win && last.kills >= 5) out.push("⚔️ Strong fights—convert more late-game rotations.");
  return out;
}

export function modeBadgeFromHeuristics(_matches: RecentMatch[]) {
  // Placeholder (without mode data). You can augment later when mode is stored.
  return "🎯 Grinder";
}
