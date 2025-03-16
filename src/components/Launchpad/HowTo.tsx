// import React from 'react'
import { Link } from "react-router-dom"

function HowTo() {
    return (
        <div className="flex items-center justify-center font-space text-white p-[20px]">
            <div className="grid lg:grid-cols-2 w-full lg:w-[80%] border border-primary rounded-[12px] p-[40px_20px] lg:p-[40px]">
                <div className="space-y-[15px]">
                    <p className="leading-[40px] text-[36px] font-[500] text-[#FAFAFA]">How To Get Started</p>
                    <p>Simple and easy way to start your investment <br className="hidden lg:block" />
                        in cryptocurrency</p>
                    <Link to="/lock-stake" className="bg-primary text-white p-[8px_15px] rounded-[8px]">Get Started</Link>
                </div>
                <div className="mt-[40px] lg:mt-0 flex flex-col space-y-[25px] items-start justify-start ">
                    <div className="flex items-start space-x-[10px]">
                        <div>
                            <img src="./buy.svg" className="h-[60px] lg:h-[80px] min-w-[60px] lg:w-[80px]" alt="" />
                        </div>
                        <div>
                            <p className="text-[18px] lg:text-[24px] font-[500]">Buy $DRX Tokens</p>
                            <p className="text-[14px] leading-[15px] font-[400]">You can purchase $DRX from <br className="hidden lg:block" /> Pancake Swap</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-[10px]">
                        <div>
                            <img src="./lock.svg" className="h-[60px] lg:h-[80px] min-w-[60px] lg:w-[80px]" alt="" />
                        </div>
                        <div>
                            <p className="text-[18px] lg:text-[24px] font-[500]">Lock $DRX</p>
                            <p className="text-[14px] leading-[15px] font-[400]">Lock $DRX Tokens to enter <br className="hidden lg:block" /> Subscription Tier System</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-[10px]">
                        <div>
                            <img src="./participate.svg" className="h-[60px] lg:h-[80px] min-w-[60px] lg:w-[80px]" alt="" />
                        </div>
                        <div>
                            <p className="text-[18px] lg:text-[24px] font-[500]">Participate in the launches,</p>
                            <p className="text-[14px] leading-[15px] font-[400]">Buyers that are verified via the Rank <br className="hidden lg:block" /> Badge system will get to participate in the launch <br className="hidden lg:block" /> popular currencies and keep track of them. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HowTo