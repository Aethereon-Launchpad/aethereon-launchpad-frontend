// import React from 'react'

import { ReactNode } from "react"
import Topbar from "../components/Global/Topbar"
import Navbar from '../components/Global/Navbar'
import Footer from "../components/Global/Footer"

function Layout({children}: {children : ReactNode}) {
  return (
    <div className="bg-[#000000]">
        <Topbar/>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout