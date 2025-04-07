import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../../../layout/Main';
import { useGiveaway } from '../../../../../hooks/web3/useGiveaway';

export default function AdminGiveawayManageID() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: giveaway, loading, error } = useGiveaway(id as `0x${string}`);

    return (
        <Layout>
            <div className="p-[40px_20px] lg:p-[100px_40px] font-space">
                <div className="flex flex-col gap-[20px] text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-[24px] lg:text-[36px] font-[500]">
                            Manage Giveaway
                        </h1>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate(`/admin/dashboard/giveaways/fund/${id}`)}
                                className="bg-primary text-white px-4 py-2 rounded-lg"
                            >
                                Fund Giveaway
                            </button>
                            <button
                                onClick={() => navigate('/admin/dashboard/giveaways')}
                                className="bg-transparent border border-white text-white px-4 py-2 rounded-lg"
                            >
                                Back to List
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div>Loading giveaway details...</div>
                    ) : error ? (
                        <div>Error loading giveaway: {error.message}</div>
                    ) : giveaway ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-[#17043B] p-6 rounded-lg space-y-4">
                                <h2 className="text-xl font-semibold">Basic Information</h2>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-gray-400">Token</p>
                                        <p className="text-white">{giveaway.airdropToken.symbol}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Token Address</p>
                                        <p className="text-white break-all">{giveaway.airdropToken.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Total Available</p>
                                        <p className="text-white">{giveaway.totalAvailableRewards}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Total Claimed</p>
                                        <p className="text-white">{giveaway.totalClaimed}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Token Per User</p>
                                        <p className="text-white">{giveaway.tokenPerUser}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#17043B] p-6 rounded-lg space-y-4">
                                <h2 className="text-xl font-semibold">Time Settings</h2>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-gray-400">Whitelist Start</p>
                                        <p className="text-white">
                                            {new Date(giveaway.whitelistStartTime * 1000).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Whitelist End</p>
                                        <p className="text-white">
                                            {new Date(giveaway.whitelistEndTime * 1000).toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Withdraw Delay</p>
                                        <p className="text-white">{giveaway.withdrawDelay} seconds</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-400">Linear Vesting End</p>
                                        <p className="text-white">
                                            {new Date(giveaway.linearVestingEndTime * 1000).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {giveaway.cliffPeriod && giveaway.cliffPeriod.length > 0 && (
                                <div className="bg-[#17043B] p-6 rounded-lg space-y-4 lg:col-span-2">
                                    <h2 className="text-xl font-semibold">Cliff Vesting Schedule</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {giveaway.cliffPeriod.map((period: any, index: number) => (
                                            <div key={index} className="bg-[#0B0118] p-4 rounded-lg">
                                                <p className="text-gray-400">Period {index + 1}</p>
                                                <p className="text-white">
                                                    Time: {new Date(period.claimTime * 1000).toLocaleString()}
                                                </p>
                                                <p className="text-white">
                                                    Percentage: {period.percentage}%
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>No giveaway found</div>
                    )}
                </div>
            </div>
        </Layout>
    );
} 