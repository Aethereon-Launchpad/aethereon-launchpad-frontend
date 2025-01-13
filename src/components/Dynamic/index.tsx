// import React from 'react'

function Dynamic() {
  return (
    <div className="flex flex-col font-space p-[40px_20px] text-white items-center justify-center">
        <p className="text-[70px] font-[500] leading-[75px] text-center">Unlock Dynamic Rewards with <br className="hidden lg:block" /> Longer Lock Periods</p>
        <p className="text-[22px] mt-[5px]">The longer you lock your stake, the higher your multiplier!</p>

        <img src="./unlock.svg" className="mt-[5px]" alt="" />

        <div className="mt-[20px] w-[50%] grid lg:grid-cols-3 gap-[20px]">
            <div className="col-span-2">
                <p>Lock Period</p>
                <select name="" id="" className="h-[50px] bg-transparent border w-full rounded-[6px]">
                    <option value="1">1 Month (+1x)</option>
                </select>
            </div>
            <div className="">
            <p>Lock Period</p>
            <input type="text" className="h-[50px] w-full outline-none bg-transparent border rounded-[6px]" />
            </div>
            <div className="col-span-2">
            <p>Lock Period</p>
            <input type="text" className="h-[50px] w-full outline-none bg-transparent border rounded-[6px]" />
            </div>
            <div className="">
            <p>Lock Period</p>
            <input type="text" className="h-[50px] w-full outline-none bg-transparent border rounded-[6px]" />
            </div>
        </div>
    </div>
  )
}

export default Dynamic