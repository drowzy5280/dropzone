// components/marketing/Section.tsx
export function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  return <section id={id} className={`py-14 md:py-20 ${className}`}>{children}</section>;
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl md:text-3xl font-semibold">{children}</h2>;
}

export function Sub({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-400">{children}</p>;
}

// ⬇️ allow className here
export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-[#202029] bg-[#0F0F12] p-5 ${className}`}>{children}</div>;
}
