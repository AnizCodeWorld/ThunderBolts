"use client";
import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar/>
     {/* Hero Section*/}
     <Hero/>

      {/* --- Statistics / Impact Section --- */}
      <section id="impact" className="py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-4xl font-bold text-emerald-600 mb-2">500+</h3>
            <p className="text-slate-500 font-medium uppercase tracking-wide">Meals Delivered</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-4xl font-bold text-emerald-600 mb-2">45</h3>
            <p className="text-slate-500 font-medium uppercase tracking-wide">Partnered NGOs</p>
          </div>
          <div className="p-8 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-4xl font-bold text-emerald-600 mb-2">1.2 Tons</h3>
            <p className="text-slate-500 font-medium uppercase tracking-wide">Waste Prevented</p>
          </div>
        </div>
      </section>

      {/* --- Features Section --- */}
      <section id="how-it-works" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Real-Time Platform Features</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "Smart Matching", desc: "Location-based matching between nearby donors and NGOs for fast pickup." },
            { title: "Real-time Tracking", desc: "Live updates on food availability, quantity, and expiry times." },
            { title: "Verified Partners", desc: "Security through digital verification of all donors and volunteer NGOs." }
          ].map((feature, i) => (
            <div key={i} className="group hover:transform hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 text-2xl mx-auto group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {i + 1}
              </div>
              <h4 className="text-xl font-bold mb-3">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    <Footer/>
    </div>
  );
}