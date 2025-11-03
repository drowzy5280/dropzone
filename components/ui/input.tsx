import * as React from "react";
import clsx from "clsx";
type Props = React.InputHTMLAttributes<HTMLInputElement>;
export const Input = React.forwardRef<HTMLInputElement, Props>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={clsx("w-full rounded-2xl bg-[#0B0B0E] border border-[#202029] px-4 py-3 outline-none focus:ring-2 focus:ring-[#9A4DFF]/40", className)} {...props} />;
});
