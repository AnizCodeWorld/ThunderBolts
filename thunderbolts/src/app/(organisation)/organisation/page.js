import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Listing from "@/models/Listing";
import { MapPin, Clock, PackageCheck, Info, ExternalLink } from "lucide-react";
import ClaimButton from "@/features/organisation/components/ClaimButton";

export default async function NGODashboard({ searchParams }) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const activeTab = (await searchParams).tab || "available";

  await connectDB();

  // 1. Parallelize data fetching to reduce waterfall latency
  const [listings, pickupCount] = await Promise.all([
    fetchListings(activeTab, userId),
    Listing.countDocuments({ claimedBy: userId, status: "claimed" })
  ]);

  return (
    <div className='min-h-screen bg-[#F8FAFC] p-6 selection:bg-emerald-100'>
      <div className='max-w-6xl mx-auto'>
        <header className='mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-black text-slate-900 tracking-tight'>NGO Operations</h1>
            <p className='text-slate-500 text-sm'>Manage your food collection and distributions.</p>
          </div>
          <Link
            href='/history'
            className='text-[10px] font-bold text-slate-400 hover:text-emerald-600 uppercase tracking-widest border border-slate-200 px-4 py-2 rounded-full transition-all bg-white shadow-sm'
          >
            View Impact History
          </Link>
        </header>

        {/* --- Tab Navigation (Optimized with Link) --- */}
        <div className='flex gap-6 mb-8 border-b border-slate-200'>
          <TabLink 
            label="Available Feed" 
            active={activeTab === "available"} 
            href="?tab=available" 
          />
          <TabLink 
            label="My Pickups" 
            active={activeTab === "my-pickups"} 
            href="?tab=my-pickups" 
            count={pickupCount} 
          />
        </div>

        {/* --- Food Cards Grid --- */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((item) => (
            <ListingCard 
                key={item._id.toString()} 
                item={item} 
                isPickup={activeTab === "my-pickups"} 
            />
          ))}
        </div>

        {listings.length === 0 && <EmptyState />}
      </div>
    </div>
  );
}

// --- Helper Components & Functions ---

async function fetchListings(tab, userId) {
  const query = tab === "available" 
    ? { status: "available", expiryTime: { $gt: new Date() } }
    : { claimedBy: userId, status: "claimed" };

  return Listing.find(query)
    .populate("donorId", "name email donorDetails")
    .sort(tab === "available" ? { createdAt: -1 } : { updatedAt: -1 })
    .lean();
}

const TabLink = ({ label, active, href, count }) => (
  <Link
    href={href}
    className={`pb-4 px-2 text-sm font-bold transition-all relative ${
      active ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
    }`}
  >
    {label}
    {active && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600" />}
    {count > 0 && !active && (
      <span className='ml-2 bg-emerald-500 text-white px-1.5 py-0.5 rounded-full text-[10px]'>
        {count}
      </span>
    )}
  </Link>
);

const ListingCard = ({ item, isPickup }) => (
  <div className='group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:border-emerald-200 transition-all'>
    <div className='p-5'>
      <div className='flex justify-between items-center mb-4'>
        <span className='bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest'>
          {item.foodType}
        </span>
        {isPickup && (
          <span className='flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase'>
            <PackageCheck size={14} /> Claimed
          </span>
        )}
      </div>

      <h3 className='text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors'>
        {item.title}
      </h3>
      <p className='text-xs text-slate-400 mt-1 mb-4'>{item.quantity}</p>

      <div className='space-y-2.5 bg-slate-50/50 p-3 rounded-xl mb-4 border border-slate-100'>
        <div className='flex items-start gap-2 text-slate-600'>
          <MapPin size={14} className='mt-0.5 text-slate-400' />
          <span className='text-[11px] leading-relaxed'>{item.pickupAddress}</span>
        </div>
        <div className='flex items-center gap-2 text-slate-600'>
          <Clock size={14} className='text-slate-400' />
          <span className='text-[11px]'>
            Expires: {new Date(item.expiryTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {isPickup ? (
        <div className='space-y-2'>
          <div className='flex items-center justify-between p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100'>
            <span className='text-[10px] font-black text-emerald-700 uppercase'>Contact</span>
            <span className='text-xs font-bold text-emerald-900'>
              {item.donorId?.donorDetails?.phoneNumber || "No Phone"}
            </span>
          </div>
          <button className='w-full py-2.5 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2'>
            Open in Maps <ExternalLink size={12} />
          </button>
        </div>
      ) : (
        <ClaimButton listingId={item._id.toString()} />
      )}
    </div>
  </div>
);

const EmptyState = () => (
  <div className='text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200 mt-6'>
    <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
        <Info className='text-slate-300' size={24} />
    </div>
    <p className='text-slate-400 text-sm font-medium'>
      No active food items found in this category.
    </p>
  </div>
);