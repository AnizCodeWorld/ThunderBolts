"use client";

import { useTransition } from "react";
import { completeListing } from "@/features/donor/actions";

export default function HandoverButton({ listingId }) {
  const [isPending, startTransition] = useTransition();

  const handleComplete = async () => {
    if (confirm("Has the NGO successfully collected this food?")) {
      startTransition(async () => {
        const result = await completeListing(listingId);
        if (result.error) alert(result.error);
      });
    }
  };

  return (
    <button
      onClick={handleComplete}
      disabled={isPending}
      className={`w-full mt-4 py-2 rounded-lg text-xs font-bold transition-all ${
        isPending 
          ? "bg-slate-100 text-slate-400" 
          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md"
      }`}
    >
      {isPending ? "Updating..." : "Confirm Collection"}
    </button>
  );
}