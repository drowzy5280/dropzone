import * as React from "react";
import clsx from "clsx";
type Props = React.HTMLAttributes<HTMLSpanElement> & { tone?: "neutral" | "success" | "warning" | "accent" };
export function Badge({ className, tone = "neutral", ...props }: Props) {
  const tones = {
    neutral: "bg-white/[.04] border-white/[.08] text-white/80",
    success: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
    warning: "bg-amber-500/10 border-amber-400/20 text-amber-300",
    accent: "bg-[#9A4DFF]/10 border-[#9A4DFF]/30 text-[#C9A8FF]",
  };
  return <span className={clsx("inline-flex items-center px-2.5 py-1 rounded-full text-xs border", tones[tone], className)} {...props} />;
}
