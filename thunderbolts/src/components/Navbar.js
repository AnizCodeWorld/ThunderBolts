import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <>
    {/* --- Navigation --- */}
       <header className="flex justify-between items-center py-3 px-6 md:px-20 bg-white">
        <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Logo" style={{width:37}} />
          <span className="text-2xl font-bold text-green-900">FoodLink</span>
        </div>
        <nav>
          <ul className="hidden md:flex items-center gap-8 list-none">
            <li><a href="/" className="text-gray-700 font-semibold hover:text-amber-500 transition-colors">Home</a></li>
            <li><a href="/impact" className="text-gray-700 font-semibold hover:text-amber-500 transition-colors">Our Impact</a></li>
            <li><a href="/knowhow" className="text-gray-700 font-semibold hover:text-amber-500 transition-colors">How it Works</a></li>
            <li><a href="/about" className="text-gray-700 font-semibold hover:text-amber-500 transition-colors">About Us</a></li>
            <li>
              <Link href={'/log-in'}>
              <button className="bg-amber-500 text-white px-6 py-2.5 rounded-full font-bold hover:bg-amber-600 transition-all">
                Sign-in
              </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
            </>
  )
}

export default Navbar