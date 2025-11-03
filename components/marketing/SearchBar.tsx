"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [q, setQ] = useState("");
  const router = useRouter();
  function go(e?: React.FormEvent) {
    e?.preventDefault();
    const name = q.trim();
    if (!name) return;
    router.push(`/player/${encodeURIComponent(name)}`);
  }
  return (
    <form onSubmit={go} className="flex w-full max-w-xl gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search your Epic name"
          className="pl-9 bg-[#0D0D10] border-white/10"
        />
      </div>
      <Button type="submit" className="bg-white text-black hover:bg-white/90 rounded-xl">
        Search
      </Button>
    </form>
  );
}
