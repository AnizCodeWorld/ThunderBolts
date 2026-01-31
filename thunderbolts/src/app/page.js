"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React, { useState } from 'react';

export default function FoodLinkLanding() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Navbar */}
     <Navbar/>

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center px-6 md:px-20 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-green-900/90 z-0"></div>
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover -z-10" 
          alt="Hero background"
        />

        <div className="relative flex-1 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Share Extra Food<br />Spread Extra Smiles :)
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-lg">
            Connect surplus food with NGOs and reduce hunger, one meal at a time
          </p>
          <Link href={'/register'}>
          <button className="bg-amber-500 text-green-950 py-3 px-10 rounded-full font-bold hover:bg-amber-400 transition-transform active:scale-95">
            Register
          </button>
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 relative justify-end z-10">
          {/* Decorative Circle */}
          <div className="absolute -bottom-12 -right-4 w-72 h-72 bg-amber-500 rounded-full -z-10"></div>
          <img 
            src="/o.png" 
            alt="Volunteers" 
            className="w-[400px] h-[300px] object-cover rounded-xl border-4 border-white/20 shadow-2xl" 
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 py-16 px-6 md:px-20 text-center bg-white">
        <div className="py-6 border rounded-xl border-emerald-400">
          <h2 className="text-4xl font-bold text-green-900 mb-2">500+</h2>
          <p className="text-gray-400 text-xs tracking-[0.2em] font-bold">MEALS DELIVERED</p>
        </div>
        <div className="py-6 border rounded-xl border-emerald-400">
          <h2 className="text-4xl font-bold text-green-900 mb-2">45</h2>
          <p className="text-gray-400 text-xs tracking-[0.2em] font-bold">PARTNERED NGOs</p>
        </div>
        <div className="py-6 border rounded-xl border-emerald-400">
          <h2 className="text-4xl font-bold text-green-900 mb-2">1.2 Tons</h2>
          <p className="text-gray-400 text-xs tracking-[0.2em] font-bold">WASTE PREVENTED</p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-sky-50 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8">The FoodLink Foundation</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            <strong className="text-gray-900">FoodLink</strong> is a web-based digital platform designed to reduce food wastage and fight hunger by connecting surplus food providers with NGOs and volunteers in real time.
          </p>

          <div className={`${isExpanded ? 'block animate-fadeIn' : 'hidden'}`}>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              The platform enables donors such as restaurants, event organizers, and households to list unused food by providing essential details. NGOs can view nearby food donations, accept available listings, and coordinate timely pickups through volunteers.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              FoodLink also aims to provide meals to children from communities with local food waste. We aim to support every individual and fight hunger together.
            </p>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
              <div className="flex gap-4">
                <div className="w-1.5 bg-green-500 rounded-full shrink-0"></div>
                <div>
                  <h3 className="text-green-700 text-2xl font-bold mb-2">Our Vision</h3>
                  <p className="text-gray-600">No child shall go hungry. Ending the cycle of poverty through nutrition.</p>
                </div>
              </div>
    
              <div className="flex gap-4">
                <div className="w-1.5 bg-green-500 rounded-full shrink-0"></div>
                <div>
                  <h3 className="text-green-700 text-2xl font-bold mb-2">Our Mission</h3>
                  <p className="text-gray-600">Serving 1 million meals and managing food waste by 2026.</p>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-blue-600 text-white py-3 px-10 rounded-full text-base font-semibold hover:bg-blue-800 transition-all shadow-md hover:-translate-y-1 active:translate-y-0 mt-4"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}