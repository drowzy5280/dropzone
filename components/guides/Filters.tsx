"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORIES, ALL_TAGS, GUIDES, Guide } from "@/lib/guides";

export default function GuidesFilters({ onChange }: { onChange: (guides: Guide[]) => void }) {
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return GUIDES.filter(g => {
      const byCat = cat === "all" || g.category === cat;
      const byQ = !ql || g.title.toLowerCase().includes(ql) || g.summary.toLowerCase().includes(ql);
      const byTags = !tags.length || tags.every(t => g.tags.includes(t));
      return byCat && byQ && byTags;
    }).sort((a,b) => Number(b.featured) - Number(a.featured));
  }, [cat, q, tags]);

  // push results up
  useMemo(() => { onChange(filtered); }, [filtered, onChange]);

  function toggleTag(t: string) {
    setTags(prev => prev.includes(t) ? prev.filter(x => x!==t) : [...prev, t]);
  }

  return (
    <div className="space-y-3">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        <Tab label="All" active={cat==="all"} onClick={()=>setCat("all")} />
        {CATEGORIES.map(c => (
          <Tab key={c.key} label={c.label} active={cat===c.key} onClick={()=>setCat(c.key)} />
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <Input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Search guides (e.g., rotations, endgame, tilt)"
          className="bg-[#0D0D10] border-white/10"
        />
        <Button variant="secondary" onClick={()=>{ setQ(""); setCat("all"); setTags([]); }}>Reset</Button>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {ALL_TAGS.map(t => (
          <Badge
            key={t}
            onClick={()=>toggleTag(t)}
            className={`cursor-pointer border ${tags.includes(t) ? "bg-white/10 border-white/30" : "bg-white/0 border-white/10"}`}
          >
            #{t}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function Tab({ label, active, onClick }: { label: string; active: boolean; onClick: ()=>void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm border transition
        ${active ? "bg-white/10 border-white/30" : "bg-white/0 border-white/10 hover:border-white/20"}`}
    >
      {label}
    </button>
  );
}
