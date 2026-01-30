"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/features/auth/actions';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState('donor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.role = role;

    const result = await registerUser(data);
    if (result.success) {
      router.push('/log-in?registered=true');
    } else {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center bg-white text-slate-900 font-sans">
      <div className="w-full max-w-2xl p-8 border border-slate-200">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight uppercase">Create Account</h1>
          <p className="text-sm text-slate-500 mt-2">Join Team ThunderBolts FoodLink Network</p>
        </div>

        <div className="flex mb-8 border border-slate-900">
          <button type="button" onClick={() => setRole('donor')} className={`flex-1 py-3 text-sm font-bold ${role === 'donor' ? 'bg-slate-900 text-white' : ''}`}>DONOR</button>
          <button type="button" onClick={() => setRole('ngo')} className={`flex-1 py-3 text-sm font-bold ${role === 'ngo' ? 'bg-slate-900 text-white' : ''}`}>NGO</button>
        </div>

        {error && <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Base Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="email" required type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-slate-300 focus:border-slate-900 outline-none" />
            <input name="password" required type="password" placeholder="Password" className="w-full px-4 py-3 border border-slate-300 focus:border-slate-900 outline-none" />
          </div>

          <hr className="border-slate-100" />

          {role === 'donor' ? (
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-emerald-600">Donor Profile</h3>
              <input name="name" required placeholder="Full Name / Business Name" className="w-full px-4 py-3 border border-slate-300 outline-none" />
              <select name="donorType" className="w-full px-4 py-3 border border-slate-300 outline-none">
                <option value="Individual">Individual</option>
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
              </select>
              <input name="phoneNumber" required placeholder="Contact Number" className="w-full px-4 py-3 border border-slate-300 outline-none" />
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-widest text-emerald-600">NGO Verification Form</h3>
              <input name="ngoName" required placeholder="Official NGO Name" className="w-full px-4 py-3 border border-slate-300 outline-none" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select name="ngoType" className="w-full px-4 py-3 border border-slate-300 outline-none">
                  <option value="">Type of NGO</option>
                  <option value="Food Bank">Food Bank</option>
                  <option value="Orphanage">Orphanage</option>
                  <option value="Shelter Home">Shelter Home</option>
                </select>
                <select name="registrationType" className="w-full px-4 py-3 border border-slate-300 outline-none">
                  <option value="">Registration Type</option>
                  <option value="Society">Society</option>
                  <option value="Trust">Trust</option>
                  <option value="Section 8 Company">Section 8 Company</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="registrationNumber" required placeholder="Reg. Number" className="w-full px-4 py-3 border border-slate-300 outline-none" />
                <input name="ngoDarpanId" placeholder="NGO Darpan ID" className="w-full px-4 py-3 border border-slate-300 outline-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="reg12A" placeholder="12A Number" className="w-full px-4 py-3 border border-slate-300 outline-none" />
                <input name="reg80G" placeholder="80G Certificate Number" className="w-full px-4 py-3 border border-slate-300 outline-none" />
              </div>

              <textarea name="address" required placeholder="Full Address with PIN Code" className="w-full px-4 py-3 border border-slate-300 outline-none h-24" />
              <input name="beneficiaryCapacity" type="number" placeholder="Beneficiary Capacity (e.g. 100)" className="w-full px-4 py-3 border border-slate-300 outline-none" />
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full bg-emerald-600 text-white py-4 font-bold uppercase tracking-widest hover:bg-emerald-700 transition-colors">
            {loading ? "Processing..." : `Register as ${role}`}
          </button>
        </form>
         {/* Footer Link */}
        <div className="mt-8 text-center text-sm">
          <span className="text-slate-500">Already been to FoodLink? </span>
          <a href="/log-in" className="font-bold underline hover:text-emerald-600 transition">Sign-in</a>
        </div>
      </div>
    </div>
  );
}