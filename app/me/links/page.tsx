"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LinksPage() {
  const [username, setUsername] = useState("");
  const [epicId, setEpicId] = useState("");
  const [msg, setMsg] = useState("");

  async function save() {
    const res = await fetch("/api/me/links/epic", { method: "POST", body: JSON.stringify({ username, epicId }) });
    const data = await res.json();
    setMsg(data.ok ? "Linked!" : data.error ?? "Error");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Link Epic (stub)</h1>
      <div className="space-y-3">
        <Input placeholder="Epic username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <Input placeholder="Epic account id" value={epicId} onChange={(e) => setEpicId(e.target.value)} />
        <Button onClick={save}>Save</Button>
        {msg && <div className="text-sm text-gray-300">{msg}</div>}
      </div>
    </div>
  );
}
