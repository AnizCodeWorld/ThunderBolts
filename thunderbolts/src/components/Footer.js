import React from 'react'

function Footer() {
  return (
   <>
     {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold text-white mb-2">FoodLink</div>
            <p>VVM's SHREE DAMODAR COLLEGE</p>
          </div>
          <div className="text-sm">
            © 2026 Team ThunderBolts. All rights reserved.
          </div>
        </div>
      </footer>
   </>
  )
}

export default Footer