import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'
import Footer from './Footer'
import BrandingBar from './BrandingBar'
function Layout() {
  return (
    <>
        <Navbar />
        <BrandingBar />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout
