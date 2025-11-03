import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PlanPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const plan = await prisma.coachingPlan.findUnique({ where: { id } });
  if (!plan) return <div className="p-6 text-red-500">Plan not found.</div>;

  const modules = JSON.parse(plan.modules);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">{plan.username} — Coaching Plan</h1>
      <p className="text-gray-300 mb-6">{plan.summary}</p>

      <div className="space-y-4">
        {modules.map((m: any, i: number) => (
          <div key={i} className="bg-neutral-900 border border-[#202029] rounded-2xl p-4">
            <h2 className="text-xl font-semibold">{m.title}</h2>
            <div className="text-sm text-gray-400 mb-2">{m.focus}</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-1">Drills</h3>
                <ul className="list-disc list-inside text-gray-200">{m.drills.map((d: string, idx: number) => <li key={idx}>{d}</li>)}</ul>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Tips</h3>
                <ul className="list-disc list-inside text-gray-200">{m.tips.map((t: string, idx: number) => <li key={idx}>{t}</li>)}</ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl p-4 bg-neutral-900 border border-[#202029]">
        <div className="font-semibold mb-1">Want a deeper plan?</div>
        <p className="text-gray-400 mb-3">Upgrade to Pro for progress checks, longer modules, and saved history.</p>
        <Link href="/pro"><Button>Go Pro</Button></Link>
      </div>
    </div>
  );
}
