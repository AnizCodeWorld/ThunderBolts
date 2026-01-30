"use client";

import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function SearchNGOs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    startTransition(() => {
      router.replace(`/donor?${params.toString()}`);
    });
  }

  return (
    <div className="relative group w-full md:w-80">
      <Search 
        className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${
          isPending ? "text-emerald-500 animate-pulse" : "text-slate-400 group-focus-within:text-emerald-600"
        }`} 
        size={16} 
      />
      <input 
        type="text" 
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Find an NGO..." 
        className="pl-10 pr-4 py-2 bg-slate-100/50 border-transparent border focus:bg-white focus:border-emerald-500 rounded-full text-sm w-full transition-all outline-none"
      />
    </div>
  );
}