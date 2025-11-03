"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
export default function PlacementHistogram({ data }: { data: { bucket: string; count: number }[] }) {
  return (
    <div className="bg-neutral-900 border border-[#202029] rounded-2xl p-4 h-64">
      <div className="text-sm text-gray-400 mb-2">Placement Distribution</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bucket" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
