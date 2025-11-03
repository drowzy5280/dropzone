export function SectionHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: React.ReactNode; }) {
  return (
    <div className="mb-3">
      <div className="flex items-end justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {right}
      </div>
      {subtitle && <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div>}
      <div className="h-px bg-gradient-to-r from-transparent via-[#9A4DFF]/30 to-transparent mt-2" />
    </div>
  );
}
