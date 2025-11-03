import { Neon, GlowDivider } from "./Gradient";
import SearchBar from "./SearchBar";
import { ShieldCheck, Bolt, BrainCircuit, BadgeCheck } from "lucide-react";

export default function Hero() {
  return (
    <div className="pt-16 pb-10">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1]">
          Land smart. <Neon>Win more.</Neon>
        </h1>
        <p className="mt-4 text-gray-300 text-lg">
          Track your Fortnite performance, spot trends, and get
          <span className="font-semibold"> personalized coaching plans </span>
          powered by your actual matches. No guesswork—just the right habits to climb.
        </p>
        <div className="mt-8 flex justify-center">
          <SearchBar />
        </div>
      </div>

      <GlowDivider />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-sm text-gray-300">
        <Trust icon={<BadgeCheck className="h-4 w-4" />} text="Verified Profiles (Epic optional)" />
        <Trust icon={<ShieldCheck className="h-4 w-4" />} text="Secure Checkout (Stripe)" />
        <Trust icon={<Bolt className="h-4 w-4" />} text="Fast updates (auto-refresh)" />
        <Trust icon={<BrainCircuit className="h-4 w-4" />} text="Coaching insights from your data" />
      </div>
    </div>
  );
}

function Trust({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 border border-white/10 rounded-xl px-3 py-2 bg-white/[.02]">
      <span className="text-white/80">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
