"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
export default function LineTrend({ data, dataKey = "kd", label = "KD" }: { data: any[]; dataKey?: string; label?: string; }) {
  return (
    <div className="bg-neutral-900 border border-[#202029] rounded-2xl p-4 h-64">
      <div className="text-sm text-gray-400 mb-2">{label} (last 20)</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="i" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
