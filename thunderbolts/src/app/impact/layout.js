import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

function layout({children}) {
  return (
    <>
    <Navbar/>
  {children}
  <Footer/>
    </>
  )
}

export default layout