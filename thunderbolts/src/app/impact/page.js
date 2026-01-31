import Footer from '@/components/Footer';
import React from 'react';

export default function ImpactPage() {
  return (

<>
      {/* Impact Hero Section */}
      <section className="relative h-[250px] flex flex-col justify-center px-6 md:px-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-green-900/90 z-0"></div>
        <img 
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80" 
          className="absolute inset-0 w-full h-full object-cover -z-10" 
          alt="Impact background"
          />
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Small Actions, Big Results</h1>
          <p className="text-lg md:text-xl opacity-90">Tracking our progress in the fight against hunger and food waste.</p>
        </div>
      </section>

      {/* Impact Stats Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Impact Card 1 */}
            <div className="bg-sky-50 p-10 rounded-2xl text-center transition-transform hover:-translate-y-2 border-b-4 border-amber-500 shadow-sm">
              <div className="text-4xl mb-4">🍱</div>
              <h3 className="text-3xl font-bold text-green-900 mb-2">15,000+</h3>
              <p className="text-gray-600 font-semibold">Total Meals Redirected</p>
            </div>
            {/* Impact Card 2 */}
            <div className="bg-sky-50 p-10 rounded-2xl text-center transition-transform hover:-translate-y-2 border-b-4 border-amber-500 shadow-sm">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-3xl font-bold text-green-900 mb-2">4.5 Tons</h3>
              <p className="text-gray-600 font-semibold">CO2 Emissions Prevented</p>
            </div>
            {/* Impact Card 3 */}
            <div className="bg-sky-50 p-10 rounded-2xl text-center transition-transform hover:-translate-y-2 border-b-4 border-amber-500 shadow-sm">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-3xl font-bold text-green-900 mb-2">120+</h3>
              <p className="text-gray-600 font-semibold">Partner Restaurants</p>
            </div>
            {/* Impact Card 4 */}
            <div className="bg-sky-50 p-10 rounded-2xl text-center transition-transform hover:-translate-y-2 border-b-4 border-amber-500 shadow-sm">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-3xl font-bold text-green-900 mb-2">2,000+</h3>
              <p className="text-gray-600 font-semibold">Active Volunteers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-12">Voices from the Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm italic text-gray-700 flex flex-col justify-between">
              <p className="text-lg leading-relaxed mb-6">"FoodLink has transformed how we manage surplus at our hotel. Instead of waste, we see smiles."</p>
              <span className="not-italic font-bold text-green-900 block">- Hotel Manager, Goa</span>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm italic text-gray-700 flex flex-col justify-between">
              <p className="text-lg leading-relaxed mb-6">"The real-time alerts make it so easy for our NGO to pick up fresh food for the children we support."</p>
              <span className="not-italic font-bold text-green-900 block">- NGO Director</span>
            </div>
          </div>
        </div>
      </section>
      </>
  );
}