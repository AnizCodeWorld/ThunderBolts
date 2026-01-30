import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <>
    {/* --- Navigation --- */}
      <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">
        <div className="text-2xl font-bold text-emerald-600">FoodLink</div>
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="#how-it-works" className="hover:text-emerald-600 transition">How it Works</Link>
          <Link href="#impact" className="hover:text-emerald-600 transition">Our Impact</Link>
          <Link href="#listings" className="hover:text-emerald-600 transition">Live Listings</Link>
        </div>
        <div className="flex space-x-4">
            <Link href={'/log-in'}>
          <button className="px-5 py-2 text-emerald-600 font-semibold border border-emerald-600 rounded-lg hover:bg-emerald-50 transition">
            Login
          </button>
            </Link>
          {/* <button className="px-5 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 shadow-md transition">
            Join as Donor
            </button> */}
        </div>
      </nav>
            </>
  )
}

export default Navbar