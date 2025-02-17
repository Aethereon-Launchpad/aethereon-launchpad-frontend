// import React from 'react'

function Reward() {
  return (
    <div className="p-[40px_20px] lg:p-[40px] font-space text-white flex items-center justify-center">
        <div className="w-full xl:w-[70%] grid lg:grid-cols-2 gap-[40px]">
           <div className="p-[20px] border rounded-[10px] border-primary">
            <div className="flex items-center justify-between">
                <div className="h-[50px] w-[50px] border rounded-full">
                    <img src="./avatar.svg" alt="" />
                </div>
                <img src="./layer.svg" alt="" />
            </div>
            <p className="font-[500] text-[32px] mt-[20px]">Total Rewards</p>
            <p>The "Total Staked" metric provides users with a clear view of the amount they’ve currently invested in staking pools</p>
           <p className="text-[40px] font-[600]]">N/A</p>
           </div>
           <div className="p-[20px] border rounded-[10px] border-primary">
            <div className="flex items-center justify-between">
                <div className="h-[50px] w-[50px] border rounded-full">
                <img src="./avatar.svg" alt="" />
                </div>
                <img src="./layer.svg" alt="" />
            </div>
            <p className="font-[500] mt-[20px] text-[32px]">Voting Power</p>
            <p>The "Total Staked" metric provides users with a clear view of the amount they’ve currently invested in staking pools</p>
           <p className="text-[40px] font-[600]]">N/A</p>
           </div>
           
        </div>

    </div>
  )
}

export default Reward