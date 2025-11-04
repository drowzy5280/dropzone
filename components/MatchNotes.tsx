"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function MatchNotes({ matchId }: { matchId: string }) {
  const [notes, setNotes] = useState<{ id: string; content: string; createdAt: string }[]>([]);
  const [val, setVal] = useState("");

  async function load() {
    const r = await fetch(`/api/match/note?matchId=${matchId}`, { cache: "no-store" });
    const j = await r.json();
    setNotes(j.notes || []);
  }

  async function add() {
    if (!val.trim()) return;
    const r = await fetch(`/api/match/note`, { method: "POST", body: JSON.stringify({ matchId, content: val }) });
    const j = await r.json();
    if (j.note) { setVal(""); toast.success("Saved note"); load(); }
    else toast.error(j.error || "Error");
  }

  useEffect(() => { load(); }, [matchId]);

  return (
    <div className="mt-2">
      <div className="flex gap-2">
        <Input value={val} onChange={e=>setVal(e.target.value)} placeholder="Add a quick note…" />
        <Button onClick={add} variant="secondary">Save</Button>
      </div>
      <ul className="mt-2 space-y-1 text-sm text-gray-300">
        {notes.map(n => <li key={n.id} className="border border-white/5 rounded-xl p-2">{n.content}</li>)}
      </ul>
    </div>
  );
}
