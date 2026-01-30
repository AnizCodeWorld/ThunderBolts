"use client";
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState('donor'); // 'donor' or 'ngo'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const result = await signIn("credentials", {
  redirect: false,
  email: formData.email,
  password: formData.password,
  // role: role,   ← removed!
});

    if (result?.error) {
      // result.error contains the string returned from your authorize function
      setError(result.error === "CredentialsSignin" ? "Invalid email or password" : result.error);
    } else {
      // Force a hard refresh to ensure the session is picked up by the layout
      window.location.href = role === 'donor' ? '/donor' : '/organisation';
    }
  } catch (err) {
    setError("An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-slate-900 font-sans">
      <div className="w-full max-w-md p-8 border border-slate-200">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold tracking-tight uppercase">FoodLink Login</h1>
          <p className="text-sm text-slate-500 mt-2">Team ThunderBolts • Problem CS01SW</p>
        </div>

        {/* Role Selection */}
        <div className="flex mb-8 border border-slate-900">
          <button
            type="button"
            onClick={() => setRole('donor')}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              role === 'donor' ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-900 hover:bg-slate-50'
            }`}
          >
            DONOR
          </button>
          <button
            type="button"
            onClick={() => setRole('ngo')}
            className={`flex-1 py-3 text-sm font-bold transition-colors ${
              role === 'ngo' ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-900 hover:bg-slate-50'
            }`}
          >
            NGO
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold uppercase">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 focus:border-slate-900 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Password</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-slate-300 focus:border-slate-900 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between text-xs font-medium">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 border-slate-900 rounded-none accent-slate-900" />
              <span>Remember me</span>
            </label>
            <a href="#" className="underline hover:text-emerald-600 transition">Forgot Password?</a>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 font-bold uppercase tracking-widest transition-colors ${
              loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
            } text-white`}
          >
            {loading ? "Authenticating..." : `Sign In as ${role}`}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm">
          <span className="text-slate-500">New to FoodLink? </span>
          <a href="/register" className="font-bold underline hover:text-emerald-600 transition">Create Account</a>
        </div>
      </div>
    </div>
  );
}