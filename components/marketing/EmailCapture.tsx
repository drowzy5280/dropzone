"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thanks for subscribing! We'll keep you updated.");
        setEmail("");
      } else {
        toast.error(data.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={submit} className="max-w-md mx-auto flex gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder="you@example.com"
        className="bg-[#0D0D10] border-white/10"
        disabled={loading}
      />
      <Button type="submit" className="rounded-xl" disabled={loading}>
        {loading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}
