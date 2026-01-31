"use client";

import { useState, useTransition } from "react";
import { claimListing } from "../actions";

export default function ClaimButton({ listingId }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleClaim = () => {
    setMessage({ type: "", text: "" });

    startTransition(async () => {
      const result = await claimListing(listingId);

      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: result.success });
      }
    });
  };

  if (message.type === "success") {
    return (
      <div className="w-full py-2 px-4 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100 text-center">
        ✓ {message.text}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleClaim}
        disabled={isPending}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
          isPending 
            ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
            : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-sm shadow-emerald-100"
        }`}
      >
        {isPending ? "Processing..." : "Claim Food Now"}
      </button>

      {message.type === "error" && (
        <p className="text-[10px] text-red-500 font-medium text-center bg-red-50 p-1 rounded">
          {message.text}
        </p>
      )}
    </div>
  );
}