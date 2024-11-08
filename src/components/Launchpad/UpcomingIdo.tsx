// import React from 'react'
import SaleCard from '../Global/SaleCard'

function UpcomingIdo() {
  return (
    <div className="p-[40px_20px] lg:p-[40px] mx-auto">

        <div>
            <p className="text-[25px] lg:text-[32px] text-[#FAFAFA]">Upcoming IDO Sales</p>
            <p className="text-[14px] lg:text-[19px] text-[#A1A1AA]">Don’t Miss Out on the Next Big Project!</p>
            </div>
            <div className="grid gap-[40px]  md:grid-cols-2 xl:grid-cols-4 mt-[40px]">
               {Array.from({ length: 8 }).map((_, i) => (
                    <SaleCard key={i} />
                ))}
                
            </div>
    </div>
  )
}

export default UpcomingIdo