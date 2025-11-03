"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-XXXXXXXXXXXXXXXX";

interface InlineAdProps {
  slot: string;
  format?: string;
  responsive?: boolean;
}

export default function InlineAd({ slot, format = "auto", responsive = true }: InlineAdProps) {
  const pathname = usePathname();

  // Route guards: don't show ads on player pages or other restricted pages
  const blockedRoutes = ["/player"];
  const isBlocked = blockedRoutes.some((route) => pathname?.startsWith(route));

  useEffect(() => {
    if (isBlocked) return;

    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [isBlocked, slot]);

  if (isBlocked) return null;

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive.toString()}
      />
    </div>
  );
}
