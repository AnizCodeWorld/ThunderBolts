import React from "react";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Listing from "@/models/Listing";
import NGOCard from "@/features/donor/components/NgoCards";
import SearchNGOs from "@/features/donor/components/SearchNGOs";
import DonationForm from "@/features/donor/components/DonationForm";
import HandoverButton from "@/features/donor/components/HandoverButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Plus, Inbox, Clock, PackageCheck, AlertCircle } from "lucide-react";
import Link from "next/link";

export default async function DonorDashboard({ searchParams }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const userEmail = session?.user?.email || "Guest";
  const initial = userEmail.charAt(0).toUpperCase();

  try {
    await connectDB();

    // 1. Fetch Donor's active listings
    const myDonations = await Listing.find({
      donorId: userId,
      status: { $in: ["available", "claimed"] },
    })
      .sort({ createdAt: -1 })
      .lean();

    // 2. NGO Discovery Logic
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
      <div className='min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-emerald-100'>
        {/* Navbar */}
        <nav className='sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100'>
          <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <img src="/logo.jpeg" alt="Logo" className="w-8 h-8 rounded-md" />
              <span className='font-bold tracking-tight text-lg'>FOODLINK</span>
            </div>

            <div className='flex items-center gap-6'>
              <SearchNGOs />
              <div
                title={userEmail}
                className='h-9 w-9 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center'
              >
                <span className='text-emerald-700 font-bold text-sm'>{initial}</span>
              </div>
            </div>
          </div>
        </nav>

        <main className='max-w-7xl mx-auto px-6 py-10'>
          {/* MANAGEMENT SECTION */}
          <section className='mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8'>
            <div className='lg:col-span-4'>
              <DonationForm />
            </div>

            <div className='lg:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm'>
              <div className='flex items-center justify-between mb-6'>
                <h3 className='text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2'>
                  <Clock size={14} /> Your Live Listings
                </h3>
                <Link href="/history" className="text-[10px] font-bold text-emerald-600 uppercase hover:underline">
                  View Full History
                </Link>
              </div>

              {myDonations.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {myDonations.map((item) => (
                    <div
                      key={item._id.toString()}
                      className={`p-4 border rounded-xl transition-all ${
                        item.status === 'claimed' ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100 bg-slate-50/50'
                      }`}
                    >
                      <h4 className='font-bold text-slate-800'>{item.title}</h4>
                      <p className='text-xs text-slate-500 mt-1'>
                        {item.quantity} • {item.foodType}
                      </p>

                      {item.status === "claimed" && (
                        <div className='mt-4 pt-4 border-t border-amber-100'>
                          <div className='flex items-center gap-2 text-amber-700 mb-3'>
                            <PackageCheck size={14} />
                            <span className='text-[10px] font-bold uppercase tracking-tight'>
                              Action Required: Handover to NGO
                            </span>
                          </div>
                          <HandoverButton listingId={item._id.toString()} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className='h-40 flex flex-col items-center justify-center text-slate-400 border border-dashed rounded-xl'>
                  <p className='text-sm italic font-medium'>No active listings found.</p>
                </div>
              )}
            </div>
          </section>

          {/* NGO DISCOVERY SECTION */}
          <header className='mb-8 flex items-center justify-between'>
            <h2 className='text-2xl font-black tracking-tight text-slate-900'>
              {query ? `Results for "${query}"` : "Partner NGOs"}
            </h2>
          </header>

          {Object.keys(groupedNgos).length > 0 ? (
            Object.keys(groupedNgos).map((category) => (
              <section key={category} className='mb-12'>
                <div className='flex items-center gap-4 mb-6'>
                  <h3 className='text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]'>
                    {category}
                  </h3>
                  <div className='h-px flex-1 bg-slate-100'></div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {groupedNgos[category].map((ngo) => (
                    <NGOCard key={ngo._id.toString()} ngo={ngo} />
                  ))}
                </div>
              </section>
            ))
          ) : (
            <div className='h-60 flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-3xl bg-white'>
              <Inbox className='text-slate-200 mb-2' size={40} />
              <p className='text-slate-400 text-sm'>No organizations match your search.</p>
            </div>
          )}
        </main>
      </div>
    );
  } catch (error) {
    // Graceful Error Handling for ETIMEOUT
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
          <AlertCircle className="mx-auto text-rose-500 mb-4" size={48} />
          <h1 className="text-xl font-bold text-slate-900 mb-2">Database Connection Error</h1>
          <p className="text-slate-500 text-sm mb-6">
            We're having trouble reaching the server. This usually happens due to network restrictions or IP whitelisting.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }
}