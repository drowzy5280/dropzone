import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Logo({ withWord = true }: { withWord?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="28" y2="28">
            <stop offset="0" stopColor={BRAND.gradientFrom} />
            <stop offset="1" stopColor={BRAND.gradientTo} />
          </linearGradient>
        </defs>
        <circle cx="14" cy="14" r="12" stroke="url(#g)" strokeWidth="2" fill="none" />
        <circle cx="14" cy="14" r="5" stroke="url(#g)" strokeWidth="2" fill="none" />
        <path d="M14 4 L18 9 H10 Z" fill="url(#g)" opacity=".9" />
      </svg>
      {withWord && (
        <span className="font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00FF88] to-[#9A4DFF]">Drop</span>
          <span className="text-white">zone</span>
        </span>
      )}
    </Link>
  );
}
