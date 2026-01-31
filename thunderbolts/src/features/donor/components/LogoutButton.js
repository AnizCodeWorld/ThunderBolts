"use client";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/log-in' })}
      className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-red-600 transition-colors uppercase tracking-widest"
    >
      <LogOut size={14} />
      Logout
    </button>
  );
}