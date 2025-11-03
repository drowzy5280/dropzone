"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function WatchlistButton({ epicId, username }: { epicId: string; username: string }) {
  const [saved, setSaved] = useState(false);
  async function toggle() {
    if (\!saved) {
      const r = await fetch("/api/watchlist", { method: "POST", body: JSON.stringify({ epicId, username }) });
      const j = await r.json();
      if (j.item) { setSaved(true); toast.success("Added to Watchlist"); }
      else if (j.error) toast.error(j.error);
    } else {
      const r = await fetch(`/api/watchlist?epicId=${encodeURIComponent(epicId)}`, { method: "DELETE" });
      const j = await r.json();
      if (j.ok) { setSaved(false); toast.success("Removed from Watchlist"); }
      else if (j.error) toast.error(j.error);
    }
  }
  return <Button variant={saved ? "secondary" : "primary"} onClick={toggle}>{saved ? "Remove from Watchlist" : "Add to Watchlist"}</Button>;
}
