import React from 'react'

function Footer() {
  return (
   <>
     {/* --- Footer --- */}
      <footer className="bg-gray-50 pt-10 pb-5 border-t border-gray-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6">
          <div className="md:col-span-2">
            <h3 className="text-green-900 text-2xl font-bold mb-5">FoodLink</h3>
            <p className="text-gray-600 leading-relaxed max-w-sm">
              Making sure no meal goes to waste. We connect donors with those in need to build a hunger-free world.
            </p>
          </div>
    
          <div>
            <h4 className="text-green-900 text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/home" className="text-gray-600 hover:text-amber-600 transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-amber-600 transition-colors">About Us</a></li>
            </ul>
          </div>
    
          <div>
            <h4 className="text-green-900 text-lg font-bold mb-6">Contact Us</h4>
            <div className="text-gray-600 space-y-2 text-sm">
              <p>Email: hello@foodlink.org</p>
              <p>Phone: +1 (555) 000-1234</p>
              <p>Location: New Goa, Goa</p>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16 border-t border-gray-200 text-gray-400 text-sm">
          <p>&copy; 2026 FoodLink Organization. All rights reserved.</p>
        </div>
      </footer>
   </>
  )
}

export default Footer