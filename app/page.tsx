import Hero from "@/components/marketing/Hero";
import { Section, H2, Sub } from "@/components/marketing/Section";
import { GlowDivider } from "@/components/marketing/Gradient";
import ValueStrip from "@/components/marketing/ValueStrip";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import SocialProof from "@/components/marketing/SocialProof";
import HowItWorks from "@/components/marketing/HowItWorks";
import FAQ from "@/components/marketing/FAQ";
import InlineAd from "@/components/ads/InlineAd";
import dynamic from "next/dynamic";

const EmailCapture = dynamic(() => import("@/components/marketing/EmailCapture"), { ssr: false });

export default function HomePage() {
  return (
    <main className="pb-20">
      <Hero />

      <Section>
        <H2>Why players love <span className="bg-gradient-to-r from-[#00FF88] to-[#9A4DFF] bg-clip-text text-transparent">Dropzone</span></H2>
        <Sub className="mt-2">Stats that coach you back—no more mindless queues.</Sub>
        <div className="mt-6"><ValueStrip /></div>
      </Section>

      <InlineAd slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || ""} />

      <GlowDivider />

      <Section id="features">
        <H2>Everything you need to climb</H2>
        <Sub className="mt-2">Streaks, highlights, radar skills, coaching plans, and more.</Sub>
        <div className="mt-6"><FeatureGrid /></div>
      </Section>

      <Section>
        <H2>How it works</H2>
        <Sub className="mt-2">Three simple steps to better games.</Sub>
        <div className="mt-6"><HowItWorks /></div>
      </Section>

      <Section>
        <H2>What players are saying</H2>
        <div className="mt-6"><SocialProof /></div>
      </Section>

      <Section id="faq">
        <H2>FAQs</H2>
        <div className="mt-6"><FAQ /></div>
      </Section>

      <Section id="subscribe">
        <H2>Stay in the loop</H2>
        <Sub className="mt-2">Subscribe for tips, guides, feature updates, and creator spotlights—no spam.</Sub>
        <div className="mt-6"><EmailCapture /></div>
      </Section>
    </main>
  );
}
