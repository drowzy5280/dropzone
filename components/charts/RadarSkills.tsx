"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";

export default function RadarSkills({ data }: { data: { metric: string; score: number }[] }) {
  return (
    <div className="bg-neutral-900 border border-[#202029] rounded-2xl p-4 h-72">
      <div className="text-sm text-gray-400 mb-2">Skill Radar</div>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <Tooltip />
          <Radar name="Score" dataKey="score" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
