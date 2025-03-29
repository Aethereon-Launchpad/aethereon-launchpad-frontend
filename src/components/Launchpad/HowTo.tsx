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
                            <span className="text-primary">In 4 Simple Steps</span>
                        </p>
                        <p className="text-[16px] lg:text-[18px] text-gray-300 max-w-[500px]">
                            Join the future of cryptocurrency investments with our streamlined process
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/lock-stake")}
                        className="relative px-8 py-3 text-white font-[500] overflow-hidden group"
                    >
                        <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
                        <span className="absolute inset-[2px] bg-black transition-all duration-300 clip-path-polygon"></span>
                        <span className="relative flex items-center">
                            Begin Now <span className="ml-2">→</span>
                        </span>
                    </button>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-6">
                    {[
                        {
                            icon: "./icons/steps/signup.svg",
                            title: "Sign Up",
                            description: "Participation on DerHex requires sign-up"
                        },
                        {
                            icon: "./icons/steps/shield.svg",
                            title: "Verify Wallet",
                            description: "Verify the registered wallet for IDO Participation. One Wallet per user."
                        },
                        {
                            icon: "./icons/steps/lock.svg",
                            title: "Stake $DRX",
                            description: "Stake your $DRX tokens to access our tier system"
                        },
                        {
                            icon: "./icons/steps/rocket.svg",
                            title: "Participate in IDOs",
                            description: "Participate in exclusive token launches with your verified status"
                        }
                    ].map((step, index) => (
                        <div key={index} className="relative col-span-1 p-6 overflow-hidden group hover:cursor-pointer">
                            <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="absolute inset-[2px] bg-white/5 clip-path-polygon transition-all duration-300"></span>
                            <div className="relative flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="text-primary text-2xl font-bold group-hover:text-white transition-colors duration-300">0{index + 1}</div>
                                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                                        <img
                                            src={step.icon}
                                            alt={step.title}
                                            className="w-8 h-8 filter brightness-0 invert-[0.4] group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[20px] font-[500] mb-2 group-hover:text-white transition-colors duration-300">{step.title}</p>
                                    <p className="text-[14px] text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HowTo