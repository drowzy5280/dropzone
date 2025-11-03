export type PlacementBucket = "1" | "2-10" | "11-25" | "26-50" | "51-100";

export function toBucket(p: number | null | undefined): PlacementBucket | undefined {
  if (!p || p < 1) return undefined;
  if (p === 1) return "1";
  if (p <= 10) return "2-10";
  if (p <= 25) return "11-25";
  if (p <= 50) return "26-50";
  return "51-100";
}

/**
 * Heuristic placement guess when exact placement is unavailable.
 * Very conservative; only returns a bucket (not exact).
 * You can improve this later when you store true per-match placements.
 */
export function inferPlacementBucket(opts: {
  isWin: boolean;
  kills: number;
}): PlacementBucket {
  const { isWin, kills } = opts;
  if (isWin) return "1";
  if (kills >= 8) return "2-10";
  if (kills >= 4) return "11-25";
  if (kills >= 2) return "26-50";
  return "51-100";
}
