import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react';

export default function HowItWorks() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
     <Navbar/>

      {/* Hero Header */}
      <section className="relative h-[250px] flex flex-col justify-center px-6 md:px-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-green-900/90 z-0"></div>
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover -z-10" 
          alt="How it works background"
        />
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How FoodLink Works</h1>
          <p className="text-lg md:text-xl opacity-90">Connecting surplus food to those in need in four simple steps.</p>
        </div>
      </section>

      {/* Workflow Diagram Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-16">The Donation Workflow</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {/* Step 1 */}
            <div className="flex-1 p-5 relative group">
              <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-green-900 font-bold text-xl mb-3">Donors List Food</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Restaurants or households post details like quantity and expiry.</p>
            </div>

            <div className="text-amber-500 text-2xl font-bold rotate-90 md:rotate-0">➜</div>

            {/* Step 2 */}
            <div className="flex-1 p-5 relative group">
              <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-green-900 font-bold text-xl mb-3">NGOs Notified</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Nearby verified NGOs receive a real-time alert about the donation.</p>
            </div>

            <div className="text-amber-500 text-2xl font-bold rotate-90 md:rotate-0">➜</div>

            {/* Step 3 */}
            <div className="flex-1 p-5 relative group">
              <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-green-900 font-bold text-xl mb-3">Pickup Arranged</h3>
              <p className="text-gray-600 text-sm leading-relaxed">A volunteer or NGO staff picks up the food at the location.</p>
            </div>

            <div className="text-amber-500 text-2xl font-bold rotate-90 md:rotate-0">➜</div>

            {/* Step 4 */}
            <div className="flex-1 p-5 relative group">
              <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">4</div>
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-green-900 font-bold text-xl mb-3">Food Delivered</h3>
              <p className="text-gray-600 text-sm leading-relaxed">The food is quality-checked and served to the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="bg-sky-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* For Donors */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-8 border-green-900">
              <h3 className="text-green-900 text-2xl font-bold mb-4">For Donors</h3>
              <p className="text-gray-600 leading-relaxed">
                Reduce your waste footprint. Simply take a photo, list the food type, and set a pickup window. We handle the rest.
              </p>
            </div>
            {/* For NGOs */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border-t-8 border-green-900">
              <h3 className="text-green-900 text-2xl font-bold mb-4">For NGOs</h3>
              <p className="text-gray-600 leading-relaxed">
                Access a steady stream of donations. Our dashboard helps you manage multiple pickups and track impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
   <Footer/>
    </div>
  );
}