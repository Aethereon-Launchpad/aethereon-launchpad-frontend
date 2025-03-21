// import React from 'react'
// import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function HowTo() {
    const navigate = useNavigate();
    return (
        <div className="flex min-w-full items-center justify-center font-space text-white p-[20px]">
            <div className="flex flex-col lg:flex-row w-full max-w-[95%] gap-8">
                <div className="flex-1 space-y-6">
                    <div className="space-y-4">
                        <p className="text-[32px] lg:text-[42px] font-[600] leading-tight">
                            Start Your Journey on the DerHex Launchpad <br />
                            <span className="text-primary">In 3 Simple Steps</span>
                        </p>
                        <p className="text-[16px] lg:text-[18px] text-gray-300 max-w-[500px]">
                            Join the future of cryptocurrency investments with our streamlined process
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/lock-stake")}
                        className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-[500]"
                    >
                        Begin Now →
                    </button>
                </div>

                <div className="flex-1 grid gap-6">
                    {[
                        {
                            icon: "./buy.svg",
                            title: "Acquire $DRX Tokens",
                            description: "Purchase $DRX directly through Pancake Swap"
                        },
                        {
                            icon: "./lock.svg",
                            title: "Secure Your Position",
                            description: "Lock your $DRX to access our tier system"
                        },
                        {
                            icon: "./participate.svg",
                            title: "Engage in Launches",
                            description: "Participate in exclusive token launches with your verified status"
                        }
                    ].map((step, index) => (
                        <div key={index} className="flex items-start gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                            <div className="text-primary text-2xl font-bold">0{index + 1}</div>
                            <div>
                                <p className="text-[20px] font-[500] mb-2">{step.title}</p>
                                <p className="text-[14px] text-gray-300 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HowTo