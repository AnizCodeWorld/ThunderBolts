import React from "react";
import connectDB from "@/lib/db";
import Listing from "@/models/Listing";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CheckCircle, XCircle, Package, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  const role = session?.user?.role;

  await connectDB();

  // Fetch all listings that are NOT 'available' or 'claimed'
  const filter = role === "donor" 
    ? { donorId: userId, status: { $in: ["completed", "expired"] } }
    : { claimedBy: userId, status: { $in: ["completed"] } };

  const history = await Listing.find(filter).sort({ updatedAt: -1 }).lean();

  // Calculate Impact Stats
  const totalSaved = history.filter(i => i.status === "completed").length;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href={`/organisation`} className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span className="text-sm font-bold uppercase tracking-wider">Back to Dashboard</span>
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-2">Impact History</h1>
          <p className="text-slate-500">A record of every meal you've helped save.</p>
        </header>

        {/* --- Impact Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
            <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-1">Total Contributions</p>
            <h2 className="text-4xl font-black text-emerald-900">{totalSaved} <span className="text-lg font-medium">Items</span></h2>
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">Environmental Impact</p>
            <h2 className="text-4xl font-black text-slate-700">~{totalSaved * 1.5} <span className="text-lg font-medium">kg saved</span></h2>
          </div>
        </div>

        {/* --- History List --- */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Past Activities</h3>
          
          {history.length > 0 ? (
            history.map((item) => (
              <div key={item._id.toString()} className="flex items-center justify-between p-5 border border-slate-100 rounded-2xl hover:border-emerald-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${item.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {item.status === 'completed' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.quantity} • {new Date(item.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter ${
                    item.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-100 rounded-3xl">
              <Package className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-slate-400 italic">No history recorded yet. Start donating!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}