"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: wire to your backend/email tool
    setEmail("");
    alert("Thanks for subscribing! We'll keep you updated.");
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
      />
      <Button type="submit" className="rounded-xl">Subscribe</Button>
    </form>
  );
}
