import { Card } from "./Section";
import { Search, Activity, Dumbbell } from "lucide-react";

const steps = [
  { icon: <Search className="h-5 w-5" />, title: "Look up your name", desc: "We fetch your latest stats and build your dashboard." },
  { icon: <Activity className="h-5 w-5" />, title: "Play—keep the tab open", desc: "Auto-refresh every ~90s detects new matches as providers update." },
  { icon: <Dumbbell className="h-5 w-5" />, title: "Improve with a plan", desc: "Generate a personalized plan and track progress with streaks & grades." },
];

export default function HowItWorks() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {steps.map((s) => (
        <Card key={s.title}>
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white/[.04] border border-white/10">{s.icon}</div>
            <div>
              <div className="font-semibold">{s.title}</div>
              <div className="text-gray-400 text-sm mt-1">{s.desc}</div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
