import Link from "next/link";
import { notFound } from "next/navigation";
import { Neon } from "@/components/marketing/Gradient";
import { Card } from "@/components/marketing/Section";
import { GUIDES } from "@/lib/guides";

export default function GuideDetail({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find(g => g.slug === params.slug);
  if (!guide) return notFound();

  return (
    <main className="pb-20 max-w-3xl mx-auto px-4">
      <div className="pt-16 pb-4">
        <Link href="/guides" className="text-sm text-gray-400 hover:underline">← Back to Guides</Link>
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold">
        {guide.title} <span className="text-sm align-middle text-gray-500 ml-2">• {guide.level} • {guide.estReadMin} min</span>
      </h1>
      <p className="text-gray-300 mt-3">{guide.summary}</p>

      <div className="text-xs text-gray-500 mt-2">
        Updated {new Date(guide.updatedAt).toLocaleDateString()} • {guide.category}
      </div>

      <article className="prose prose-invert mt-6 max-w-none">
        {guide.content ? guide.content.split("\n").map((line, i) => <p key={i}>{line}</p>) : <p>Guide content coming soon.</p>}
      </article>

      <Card className="mt-8">
        <div className="font-semibold">Want personalized tips?</div>
        <div className="text-sm text-gray-300 mt-1">
          View your player page and generate a coaching plan built from your real matches. Land smart. <Neon>Win more.</Neon>
        </div>
        <div className="mt-3 text-sm">
          <Link href="/" className="underline">Search your Epic name</Link>
        </div>
      </Card>
    </main>
  );
}
