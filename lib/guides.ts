export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: "aim" | "rotations" | "endgame" | "loadout" | "mental";
  tags: string[];
  level: "Beginner" | "Intermediate" | "Advanced";
  featured?: boolean;
  estReadMin: number;
  updatedAt: string; // ISO date
  // For detail page demo; replace with MDX later if you want
  content?: string;
};

export const CATEGORIES: { key: Guide["category"]; label: string }[] = [
  { key: "aim", label: "Aiming" },
  { key: "rotations", label: "Rotations" },
  { key: "endgame", label: "Endgame" },
  { key: "loadout", label: "Loadouts" },
  { key: "mental", label: "Mental Game" },
];

export const ALL_TAGS = [
  "crosshair", "peeking", "centering",
  "map", "dead-side", "timing",
  "storm", "layers", "height",
  "shotguns", "mobility", "shield",
  "tilt", "consistency", "focus"
];

export const GUIDES: Guide[] = [
  {
    slug: "aim-crosshair-discipline",
    title: "Aiming & Crosshair Discipline",
    summary: "Flicks are flashy — crosshair placement wins gunfights. Learn centering, peek control, and how to stop over-aiming in panic fights.",
    category: "aim",
    tags: ["crosshair", "peeking", "centering"],
    level: "Beginner",
    featured: true,
    estReadMin: 7,
    updatedAt: "2025-10-10",
    content: `## Goal
Hit first, hit cleaner, hit more.

### What to practice
- Crosshair at head-height around corners
- Stop sprint-peeking
- Micro-strafe instead of standing still

### Drills
Box fights, KovaaK routines, and 10 minutes of slow crosshair walks in Creative.`
  },
  {
    slug: "rotations-positioning-fundamentals",
    title: "Rotations & Positioning Fundamentals",
    summary: "When to rotate vs. chill, safe paths to high ground, reading lobby movement, and avoiding late-game choke points.",
    category: "rotations",
    tags: ["map", "dead-side", "timing"],
    level: "Intermediate",
    featured: true,
    estReadMin: 8,
    updatedAt: "2025-10-11",
    content: `### Why you die before the fight
Rotations decide your fights before you take them.`
  },
  {
    slug: "endgame-survival-patterns",
    title: "Endgame Survival Patterns",
    summary: "Storm management, layer switching, and when to take height, stay mid, or play low. Endgame isn't chaos — it's pattern recognition.",
    category: "endgame",
    tags: ["storm", "layers", "height"],
    level: "Advanced",
    estReadMin: 9,
    updatedAt: "2025-10-12",
    content: `### Layers
Practice controlled layer swaps under pressure.`
  },
  {
    slug: "role-based-loadouts",
    title: "Loadouts that Win (Role-Based)",
    summary: "Choose a role: control, W-key, or endgame survival — then match your loadout to win more fights.",
    category: "loadout",
    tags: ["shotguns", "mobility", "shield"],
    level: "Beginner",
    estReadMin: 6,
    updatedAt: "2025-10-09",
    content: `### Roles
Pick one and commit for the session.`
  },
  {
    slug: "mental-reset-consistency",
    title: "Mental Reset & Consistency",
    summary: "Stop tilt queues, ego pushes, and panic edits. Win the mental game — the lobby follows.",
    category: "mental",
    tags: ["tilt", "consistency", "focus"],
    level: "Beginner",
    estReadMin: 5,
    updatedAt: "2025-10-08",
    content: `### Reset protocol
2 losses in a row? Take a 3-minute reset.`
  },
];
