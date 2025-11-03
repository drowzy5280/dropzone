import * as React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
};

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-2xl font-semibold transition active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed";
  const sizes = { sm: "px-3 py-2 text-sm", md: "px-5 py-3 text-sm", lg: "px-6 py-3.5 text-base" };
  const variants = {
    primary: "bg-gradient-to-r from-[#00FF88] to-[#9A4DFF] text-black shadow",
    secondary: "border border-[#202029] text-white/90 hover:bg-white/[.03]",
    ghost: "text-white/80 hover:bg-white/[.05]",
    destructive: "bg-red-600 text-white hover:bg-red-500",
  };
  return <button className={clsx(base, sizes[size], variants[variant], className)} {...props} />;
}
