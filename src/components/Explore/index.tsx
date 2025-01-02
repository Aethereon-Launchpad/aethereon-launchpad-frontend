// import React from 'react'

import SaleCard from "../Global/SaleCard"

function ExploreComp() {
  return (
    <div className="p-[40px_20px] font-space lg:p-[40px] mx-auto flex flex-col items-start">
      <div className="flex flex-col items-start w-full">
        <p className="text-start w-full text-[25px] lg:text-[32px] text-[#FAFAFA]">
        Upcoming IDO Sales
        </p>
        <p className="text-start w-full text-[14px] lg:text-[19px] text-[#A1A1AA]">
          Don’t Miss Out on the Next Big Project!
        </p>
      </div>
      <div className="grid gap-[40px] sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 mt-[40px] ">
        {Array.from({ length: 16 }).map((_, i) => (
          <SaleCard key={i} />
        ))}
      </div>
      
    </div>
  )
}

export default ExploreComp