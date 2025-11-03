import * as React from "react";
import clsx from "clsx";
export function Skeleton({ className }: { className?: string }) {
  return <div className={clsx("animate-pulse rounded-2xl bg-white/[.06] border border-white/[.08]", className)} />;
}
