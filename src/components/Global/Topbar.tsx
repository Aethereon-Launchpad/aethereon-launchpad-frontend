// import React from 'react'
import { FaRocket } from "react-icons/fa";

function Topbar() {
  return (
    <div className="topbar-gradient py-[10px] font-orbitron flex items-center justify-center uppercase text-white text-[12px] lg:text-[17px] sci-fi-text-glow">
      <FaRocket className="mr-2 animate-pulse" />
      AETHEREON - SOLANA'S PREMIER LAUNCHPAD - EXPLORE THE FUTURE
      <FaRocket className="ml-2 animate-pulse" />
    </div>
  )
}

export default Topbar