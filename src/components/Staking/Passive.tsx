// import React from 'react'

function Passive() {
  return (
    <div className="p-[40px_20px]  font-space w-full flex items-center justify-center lg:p-[40px] text-white">
        <div className="w-full lg:w-[95%] rounded-[10px] grid lg:grid-cols-2 p-[30px] border-[#8949FF] border">
          <div className="flex flex-col items-start justify-center">
          <p className="text-[28px] lg:text-[48px] font-[700] text-white leading-[35px] lg:leading-[50px]">Earn Passive Income with Yield Farming</p>
          <hr className=" text-white w-[10%] my-[10px]" />
          <div>
            <p className="text-[18px] font-[500]">Yield Distribution</p>
            <p>
              Participating in yield farming on DerHex rewards you with both $HEX and bonus governance tokens ($GOV). Rewards are distributed weekly, allowing you to enhance your earnings while also gaining a say in platform governance.</p>
          </div>

          <div className="mt-[10px]">
            <p className="text-[18px] font-[500]">APY Rates</p>
            <p>Each farming pool features clear APY rates, enabling you to compare options easily. These rates are updated in real-time, ensuring you have the most accurate information to maximize your returns.</p>
          </div>
          </div>
        <div className="mt-[40px] lg:mt-0">
          <img src="./passimg.svg" alt="" />
        </div>
        </div>
        
    </div>
  )
}

export default Passive