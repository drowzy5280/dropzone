import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export function Nav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[#202029] bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <Link className="px-3 py-2 text-sm text-gray-300 hover:text-white" href="/guides">Guides</Link>
          <Link className="px-3 py-2 text-sm text-gray-300 hover:text-white" href="/pro">Pro</Link>
        </div>
      </div>
    </nav>
  );
}
