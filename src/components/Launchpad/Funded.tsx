// import React from 'react'

import { useNavigate } from "react-router-dom"
import SaleCard from "../Global/SaleCard"

function Funded() {
    const navigation = useNavigate()
  return (
    <div className="p-[40px_20px] lg:p-[40px] mx-auto flex flex-col items-center justify-center">

        <div className="flex flex-col items-center justify-center">
            <p className="text-[25px] lg:text-[32px] text-[#FAFAFA]">Funded Projects</p>
            <p className="text-[14px] lg:text-[19px] text-[#A1A1AA]">Don’t Miss Out on the Next Big Project!</p>
            </div>
            <div className="grid gap-[40px]  md:grid-cols-2 xl:grid-cols-4 mt-[40px]">
               {Array.from({ length: 8 }).map((_, i) => (
                    <SaleCard key={i} />
                ))}
                
            </div>
            <button onClick={()=> navigation("/explore")} className="text-[#FAFAFA] mt-[50px] rounded-full border border-[#98AAC033] p-[8px_20px]">
        Explore more IDO’s
      </button>
    </div>
  )
}

export default Funded