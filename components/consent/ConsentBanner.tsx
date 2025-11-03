"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show if user hasn't consented yet
    const consent = localStorage.getItem("dz-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("dz-consent", "granted");
    updateConsent("granted");
    setShow(false);
  }

  function handleDeny() {
    localStorage.setItem("dz-consent", "denied");
    updateConsent("denied");
    setShow(false);
  }

  function updateConsent(value: "granted" | "denied") {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
        analytics_storage: value,
      });
    }
  }

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 border-t border-white/10 p-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 text-sm text-gray-300">
          We use cookies for ads and analytics. By clicking "Accept", you consent to their use.{" "}
          <Link href="/privacy" className="text-[#00FF88] hover:underline">
            Privacy
          </Link>
          {" · "}
          <Link href="/terms" className="text-[#00FF88] hover:underline">
            Terms
          </Link>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDeny}
            className="px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition"
          >
            Deny
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00FF88] to-[#9A4DFF] text-black font-medium hover:opacity-90 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
