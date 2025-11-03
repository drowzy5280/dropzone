"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function RefreshStats({ username }: { username: string }) {
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  async function refresh() {
    if (cooldown > 0) return;
    setLoading(true);
    await fetch(`/api/player?username=${encodeURIComponent(username)}`, { cache: "no-store" });
    setLoading(false);
    setCooldown(60); // 60s cooldown
  }

  useEffect(() => {
    if (!cooldown) return;
    timer.current = setInterval(() => setCooldown(c => (c > 0 ? c - 1 : 0)), 1000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [cooldown]);

  return (
    <Button onClick={refresh} disabled={loading || cooldown > 0} variant="secondary">
      {loading ? "Refreshing…" : cooldown > 0 ? `Refresh in ${cooldown}s` : "Refresh"}
    </Button>
  );
}
