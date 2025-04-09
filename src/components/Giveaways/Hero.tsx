// import React from 'react'

function Hero() {
    return (
        <div className="relative font-space overflow-hidden hero-bg">
            {/* <img src="/der-rows.svg" className=" w-full h-[400px]" alt="" /> */}
            <div className="h-[400px] w-[400px] top-0 absolute rounded-full left-[-10%] blur-[40px] bg-[#8949FF33]"></div>
            <div className="h-[500px] w-[500px] top-0 absolute rounded-full right-[-10%] blur-[40px] bg-[#8949FF33]"></div>
            <div className=" text-white min-w-full  items-center grid lg:grid-cols-2 p-[40px_20px] lg:p-[40px]">
                <div>
                    <p className="text-[40px] lg:text-[70px] font-[700] leading-[45px] lg:leading-[75px]">
                        Claim Your Share of <span className="text-primary">Exclusive Airdrops</span>
                    </p>
                    <p className="text-[18px] lg:text-[22px] leading-[20px] lg:leading-[27px] mt-[5px] lg:mt-[10px]">
                        Be among the first to receive free tokens from the hottest new projects.<br className="hidden lg:block" />
                        Simple participation, maximum rewards - your gateway to crypto wealth
                    </p>
                </div>
                <div className=" flex items-center justify-end">
                    <img src="/hero-der.svg" alt="Airdrop Giveaways Illustration" />
                </div>
            </div>
        </div>
    )
}

export default Hero