import { FortniteStats } from "./fortnite";

export interface CoachingModule { title: string; focus: string; drills: string[]; tips: string[]; }
export interface CoachingPlan { summary: string; modules: CoachingModule[]; }

export function generateCoachingPlan(stats: FortniteStats): CoachingPlan {
  const modules: CoachingModule[] = [];
  const kpm = stats.kills / Math.max(1, stats.matches);

  if (stats.avgPlacement && stats.avgPlacement > 50) {
    modules.push({
      title: "Rotations & Mid-Game Survival",
      focus: "Positioning, disengage timing, zone habits",
      drills: ["Zone timing drill", "Rotations map review"],
      tips: [
        "Avoid dead-center early; play edges",
        "Pre-position for next zone before the timer",
        "Take height before 3rd zone when safe"
      ]
    });
  }

  if ((stats.kd ?? 0) < 1.0 && kpm < 1.5) {
    modules.push({
      title: "Mechanics & Fight Confidence",
      focus: "Aim, piece control, edit confirm timing",
      drills: ["Flick drill (browser aim lab)", "Crosshair tracking warmup", "Edit-reset-confirm loops"],
      tips: ["Favor right-hand peaks", "Track first shot before ADS", "Re-chamber behind cover"]
    });
  }

  if ((stats.top10Rate ?? 0) > 25 && kpm < 1.2) {
    modules.push({
      title: "Engagement Selection & Confidence",
      focus: "Take advantaged fights; reduce stalemates",
      drills: ["Aim duels in creative", "Box entry practice"],
      tips: ["Third-party low-HP fights from height", "Force two-shot windows", "Pre-fire edits on predictable swings"]
    });
  }

  modules.push({
    title: "Warmup Foundation",
    focus: "Routine, mental reset, goal setting",
    drills: ["10m aim gym", "5m movement", "3 VOD timestamps"],
    tips: ["One focus per session", "Reflect last 3 fights", "End on a win"]
  });

  return { summary: `Focus on ${modules.map(m => m.focus).join(", ")}`, modules };
}
