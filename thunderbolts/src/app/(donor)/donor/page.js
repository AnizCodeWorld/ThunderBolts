import React from "react";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Listing from "@/models/Listing"; // 1. Ensure this import exists
import NGOCard from "@/features/donor/components/NgoCards";
import SearchNGOs from "@/features/donor/components/SearchNGOs";
import DonationForm from "@/features/donor/components/DonationForm"; // 2. Ensure this import exists
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Plus, Inbox, Clock, PackageCheck } from "lucide-react";
import Link from "next/link";

export default async function DonorDashboard({ searchParams }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; // 3. Get current user ID from session
  const userEmail = session?.user?.email || "Guest";
  const initial = userEmail.charAt(0).toUpperCase();
  
  await connectDB();

  // 4. NEW: Fetch this specific donor's listings
  const myDonations = userId 
    ? await Listing.find({ donorId: userId }).sort({ createdAt: -1 }).limit(4).lean() 
    : [];

  // 5. NGO Discovery Logic (Your existing code)
  const query = (await searchParams).query || "";
  const filter = { role: "ngo", status: "approved" };

  if (query) {
    filter.$or = [
      { "ngoDetails.ngoName": { $regex: query, $options: "i" } },
      { "ngoDetails.address": { $regex: query, $options: "i" } },
      { "ngoDetails.ngoType": { $regex: query, $options: "i" } },
    ];
  }

  const ngos = await User.find(filter).sort({ createdAt: -1 }).lean();

  const groupedNgos = ngos.reduce((acc, ngo) => {
    const category = ngo.ngoDetails?.ngoType || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(ngo);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-emerald-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
              <Plus size={18} className="text-white" />
            </div>
            <span className="font-bold tracking-tight text-lg">FOODLINK</span>
          </div>

          <div className="flex items-center gap-6">
            <SearchNGOs />
            <div title={userEmail} className="h-9 w-9 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-emerald-700 font-bold text-sm">{initial}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* --- MILESTONE 1.4: DONATION MANAGEMENT SECTION --- */}
        <section className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            {/* The Form to create new listings */}
            <DonationForm />
          </div>

          <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Clock size={14} /> Your Live Listings
              </h3>
            </div>

            {/* Displaying the fetched listings */}
            {myDonations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myDonations.map((item) => (
                  <div key={item._id.toString()} className="p-4 border rounded-xl bg-slate-50/50 border-emerald-600 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        item.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.quantity} • {item.foodType}</p>
                    
                    {item.status === 'claimed' && (
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-amber-700">
                        <PackageCheck size={14} />
                        <span className="text-[10px] font-bold">Claimed by an NGO</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-40 flex flex-col items-center justify-center text-slate-400 border border-dashed rounded-xl">
                <p className="text-sm italic">No active listings. Use the form to post food.</p>
              </div>
            )}
          </div>
        </section>

        <div className="h-px w-full bg-slate-100 mb-16"></div>

        {/* --- NGO DISCOVERY SECTION --- */}
        <header className="mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {query ? `Results for "${query}"` : "Verified Organizations"}
          </h1>
        </header>

        {Object.keys(groupedNgos).length > 0 ? (
          Object.keys(groupedNgos).map((category) => (
            <section key={category} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em]">{category}</h2>
                <div className="h-px flex-1 bg-slate-100"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {groupedNgos[category].map((ngo) => (
                  <NGOCard key={ngo._id.toString()} ngo={ngo} />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="h-60 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-3xl">
            <Inbox className="text-slate-300 mb-4" size={32} />
            <p className="text-slate-500">No organizations found.</p>
          </div>
        )}
      </main>
    </div>
  );
}