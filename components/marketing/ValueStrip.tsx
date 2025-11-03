import { Card } from "./Section";
import { LineChart, Sparkles, Gauge, Share2 } from "lucide-react";

export default function ValueStrip() {
  const items = [
    { icon: <LineChart className="h-5 w-5" />, title: "Real Stats, Real Gains", desc: "Dropzone pulls trusted stats and turns them into trends you can actually use." },
    { icon: <Sparkles className="h-5 w-5" />, title: "Instant Coaching Plans", desc: "Click once, get a plan tuned to your strengths, weak spots, and playstyle." },
    { icon: <Gauge className="h-5 w-5" />, title: "See Progress at a Glance", desc: "Streaks, daily cards, highlights, and a clean recent matches feed." },
    { icon: <Share2 className="h-5 w-5" />, title: "Share Your Wins", desc: "Auto-generate a sleek match card for those 10-kill clutch moments." },
  ];
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {items.map((it) => (
        <Card key={it.title}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/[.04] border border-white/10">{it.icon}</div>
            <div>
              <div className="font-semibold">{it.title}</div>
              <div className="text-gray-400 text-sm mt-1">{it.desc}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
