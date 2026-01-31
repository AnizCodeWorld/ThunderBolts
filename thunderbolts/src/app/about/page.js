import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function AboutPage() {
  return (
    <div className="font-sans text-gray-800 overflow-x-hidden">
      {/* Navbar */}
      <Navbar/>

      {/* About Hero Header */}
      <section className="relative h-[400px] p-10 flex items-center px-6 md:px-20 text-white overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-green-900/80 z-0"></div>
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover -z-10" 
          alt="About background"
        />

        <div className="relative flex-1 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Our Mission to End Hunger
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-lg">
            Bridging the gap between surplus food and those who need it most.
          </p>
        </div>

        <div className="hidden md:flex flex-1 relative justify-end z-10">
          {/* Decorative Circle */}
          <div className="absolute -bottom-12 -right-4 w-72 h-72 bg-amber-500 rounded-full -z-10"></div>
          <img 
            src="/NABUT.png" 
            alt="Volunteers" 
            className="w-[300px] h-[200px] p-20 object-cover rounded-xl border-4 border-white/20 shadow-2xl" 
          />
        </div>
      </section>

      {/* Our Story Section */}
      <div className="my-2 px-6 md:px-20 bg-white ">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1">
            <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">OUR STORY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-green-900 mt-2 mb-6">How FoodLink was Born</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                FoodLink started as a simple observation: millions of tons of food were being wasted daily while people in our communities were going hungry. We realized that the problem wasn't a lack of food, but a lack of <strong className="text-gray-900">connection</strong>.
              </p>
              <p>
                We built this digital bridge to make sure that excess food from restaurants, events, and homes can find its way to local NGOs and volunteers instantly.
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="relative">
              {/* Blue Shadow Accent from CSS */}
              <img 
                src="/about.png" 
                alt="Team working together" 
                className="w-full rounded-3xl py-10 shadow-[20px_20px_0px_rgba(238,247,255,1)] relative z-10 border border-gray-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
   <Footer/>
    </div>
  );
}