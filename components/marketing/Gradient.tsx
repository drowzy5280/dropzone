export function GlowDivider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-[#9A4DFF]/40 to-transparent my-6" />;
}

export function Neon({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-[#00FF88] to-[#9A4DFF] bg-clip-text text-transparent">
      {children}
    </span>
  );
}
