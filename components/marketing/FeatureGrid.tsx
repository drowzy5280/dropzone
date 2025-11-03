import { Card } from "./Section";
import { Flame, TrendingUp, CalendarDays, Stars, Clock, BadgeCheck, Eye, NotebookPen, Image as Img, Compass } from "lucide-react";

const features = [
  { icon: Flame, title: "Streaks & Trends", desc: "Win streaks, kill streaks, rolling KD and win-rate deltas—know if you're heating up or slipping." },
  { icon: CalendarDays, title: "Daily Performance", desc: "Today's matches, kills, KD, and wins—perfect for nightly grinds." },
  { icon: Stars, title: "Smart Highlights", desc: "Pop-off games and personal bests auto-detected so you can catch momentum fast." },
  { icon: Clock, title: "Time-of-Day Strengths", desc: "See when you play best (evening clutch gods, rise up)." },
  { icon: BadgeCheck, title: "Verified Profiles", desc: "Link Epic to claim your page and flex that verified badge." },
  { icon: Eye, title: "Watchlist", desc: "Follow friends & creators. Track everyone in one place." },
  { icon: NotebookPen, title: "Match Notes", desc: "Tag key games and leave yourself quick reminders." },
  { icon: Img, title: "Shareable Match Cards", desc: "Instant social images for your banger games." },
  { icon: TrendingUp, title: "Coaching Plans", desc: "One click → drill lists and practical tips matched to your numbers." },
  { icon: Compass, title: "Radar Skill Chart", desc: "Aggression, survival, rotation, game sense, consistency—see your shape." },
];

export default function FeatureGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {features.map(({ icon: Icon, title, desc }) => (
        <Card key={title}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/[.04] border border-white/10"><Icon className="h-5 w-5" /></div>
            <div>
              <div className="font-semibold">{title}</div>
              <div className="text-gray-400 text-sm mt-1">{desc}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
