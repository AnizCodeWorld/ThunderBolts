import React from 'react'

function Hero() {
  return (
    <>
    {/* --- Hero Section --- */}
      <header className="px-8 py-20 bg-emerald-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Connecting Surplus Food to Those in Need
          </h1>
          <p className="text-xl mb-10 opacity-90">
            Real-time food redistribution to reduce waste and fight hunger in our community.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-white text-emerald-600 text-lg font-bold rounded-xl hover:bg-slate-100 transition shadow-lg">
              NGO: Find Food Nearby
            </button>
            <button className="px-8 py-4 bg-emerald-800 text-white text-lg font-bold rounded-xl hover:bg-emerald-900 transition shadow-lg">
              Donor: List Surplus Food
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Hero