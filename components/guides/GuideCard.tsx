import Link from "next/link";
import { Card } from "@/components/marketing/Section";
import { Bookmark, Sparkles } from "lucide-react";
import { Guide } from "@/lib/guides";

export default function GuideCard({ g }: { g: Guide }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">{new Date(g.updatedAt).toLocaleDateString()} • {g.level} • {g.estReadMin} min</div>
        {g.featured && <span className="text-amber-300 text-xs inline-flex items-center gap-1"><Sparkles className="h-3 w-3" /> Featured</span>}
      </div>
      <Link href={`/guides/${g.slug}`} className="text-lg font-semibold hover:underline">{g.title}</Link>
      <p className="text-sm text-gray-300">{g.summary}</p>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Bookmark className="h-3.5 w-3.5" />
        <span className="capitalize">{g.category}</span>
        <span>•</span>
        <span className="truncate">{g.tags.map(t=>`#${t}`).join("  ")}</span>
      </div>
    </Card>
  );
}
