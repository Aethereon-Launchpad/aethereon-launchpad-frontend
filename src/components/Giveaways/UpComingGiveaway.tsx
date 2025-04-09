// import React from 'react'
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GiveawayCardCompleted from "./StatusCard/";
import { useGiveaway } from "../../hooks/web3/useGiveaway";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { isBefore } from "date-fns";

function UpComingGiveaways() {
    const { data, error, loading } = useGiveaway(null, { polling: false });
    const [filteredGiveaways, setFilteredGiveaways] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            const currentTime = Date.now();
            const filtered = data.filter((giveaway: any) => {
                const endTime = (Number(giveaway.whitelistEndTime)) * 1000;
                return isBefore(currentTime, endTime);
            });
            setFilteredGiveaways(filtered);
        }
    }, [data]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[200px]">
                <Preloader
                    use={ThreeDots}
                    size={60}
                    strokeWidth={6}
                    strokeColor="#5325A9"
                    duration={2000}
                />
            </div>
        );
    }

    if (error.message) {
        console.error("Upcoming Giveaway Error:", error.message);
        return (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-red-500 text-xl font-medium">Oops! Something went wrong</h3>
                <p className="text-gray-400 max-w-md">
                    We're having trouble loading the upcoming giveaways. Please try refreshing the page or check back later.
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                    Refresh Page
                </button>
            </div>
        )
    }

    return (
        <div className="font-space flex flex-col p-[40px_20px] lg:p-[40px]">
            <div className="flex flex-col items-start text-white">
                <p className="text-[32px] lg:text-[56px] font-[700] leading-[36px] lg:leading-[60px]">
                    Upcoming & Ongoing<br />Airdrop Campaigns
                </p>
            </div>
            <div className="w-full mx-auto">
                <div className="grid gap-[40px] grid-cols-3 mt-[40px]">
                    {filteredGiveaways.length > 0 ? (
                        filteredGiveaways.map((giveaway: any, index: number) => (
                            <GiveawayCardCompleted key={index} giveaway={giveaway} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400">
                            No upcoming giveaways at the moment
                        </div>
                    )}
                </div>
            </div>
            {/* <Link
                to="/explore"
                className="relative text-[#FAFAFA] mt-[50px] p-[8px_20px] w-fit mx-auto overflow-hidden group-button"
            >
                <span className="absolute inset-0 w-full h-full bg-primary clip-path-polygon"></span>
                <span className="absolute inset-[2px] bg-black transition-all duration-300 clip-path-polygon"></span>
                <span className="relative">View All Airdrops</span>
            </Link> */}
        </div>
    );
}

export default UpComingGiveaways;
