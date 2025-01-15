// import React from 'react'

function SeasonalHero() {
  return (
    <div className="p-[40px_20px] flex flex-col items-center justify-centers lg:p-[60px_40px] text-white font-space">
        <p className="text-[30px] leading-[35px] lg:leading-[65px] lg:text-[60px] font-[700]">Seasonal Challenge: Ethereal Miner</p>
        <p className="text-[16px] lg:text-[22px]">The longer you lock your stake, the higher your multiplier!</p>

        <div className="w-full lg:w-[85%] mt-[40px] relative">
            <img className="h-[350px] rounded-[10px] w-full lg:h-[500px] object-cover" src="./season.svg" alt="" />
            <div className="absolute h-full w-full flex items-end text-white top-0 p-[10px] lg:p-[30px]">
                <div className="bg-[#092143CC] flex flex-col items-start lg:items-center w-fit p-[20px_40px] lg:[20px_50px] rounded-[10px]">
                    <p className="font-[700] font-space text-[30px] lg:text-[40px]">Event Ends In</p>
                    <div className="mt-[10px] grid grid-cols-3 gap-[10px] lg:gap-[20px]">
                      <div className="flex flex-col items-center">
                        <p className="font-splash text-[40px] leading-[40px]">20</p>
                        <p className="uppercase text-[#A5DEFF] text-[14px]">Days</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="font-splash text-[40px] leading-[40px]">12</p>
                        <p className="uppercase text-[#A5DEFF] text-[14px]">Hours</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="font-splash text-[45px] leading-[40px]">14</p>
                        <p className="uppercase text-[#A5DEFF] text-[14px]">Minutes</p>
                      </div>
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SeasonalHero