"use client";
import { useState } from "react";
import { Neon, GlowDivider } from "@/components/marketing/Gradient";
import { Section, H2, Sub } from "@/components/marketing/Section";
import GuidesFilters from "@/components/guides/Filters";
import GuideCard from "@/components/guides/GuideCard";
import { GUIDES, Guide } from "@/lib/guides";
import InlineAd from "@/components/ads/InlineAd";

export default function GuidesPage() {
  const initial = GUIDES.sort((a,b)=> Number(b.featured)-Number(a.featured));
  const [items, setItems] = useState<Guide[]>(initial);

  return (
    <main className="pb-20">
      <header className="pt-16 pb-8 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1]">
          Master Fortnite fundamentals. <Neon>Level up your game sense.</Neon>
        </h1>
        <p className="mt-4 text-gray-300">
          Guides built for ranked grinders, late-night warriors, and anyone chasing consistent Ws.
          Simple. Practical. Proven in real lobbies — not theorycraft.
        </p>
      </header>

      <InlineAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_TOP || ""} />

      <div className="max-w-5xl mx-auto px-4">
        <Section className="pt-0">
          <GuidesFilters onChange={setItems} />
          <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(g => <GuideCard key={g.slug} g={g} />)}
          </div>
          {!items.length && (
            <div className="text-gray-400 text-center mt-8">No guides match your filters—try clearing search or tags.</div>
          )}
        </Section>

        <InlineAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES_MID || ""} />

        <GlowDivider />

        <Section>
          <H2>Coming next</H2>
          <Sub className="mt-2">Practice routines tailored to your stats, mode-specific strategy breakdowns, creator spotlight builds, and VOD pattern analysis.</Sub>
        </Section>
      </div>
    </main>
  );
}
