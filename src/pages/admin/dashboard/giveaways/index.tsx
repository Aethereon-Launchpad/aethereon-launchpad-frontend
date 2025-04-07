import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../../layout/Admin';
import { useGiveaway } from '../../../../hooks/web3/useGiveaway';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import GiveawayCardCompleted from '../../../../components/Giveaways/StatusCard';

export default function AdminManageGiveaways() {
    const navigate = useNavigate();
    const { data: giveaways, loading, error } = useGiveaway(null);

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[200px]">
                    <Preloader
                        use={ThreeDots}
                        size={60}
                        strokeWidth={6}
                        strokeColor="#5325A9"
                        duration={2000}
                    />
                </div>
            </Layout>
        );
    }

    if (error.message) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
                    <svg 
                        className="h-16 w-16 text-red-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                    <h3 className="text-red-500 text-xl font-medium">Failed to Load Giveaways</h3>
                    <p className="text-gray-400 max-w-md">
                        We're having trouble loading the giveaways. Please try refreshing the page or check back later.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            </Layout>
        );
    }

    console.log(giveaways)

    return (
        <Layout>
            <div className="p-[40px_20px] lg:p-[100px_40px] font-space">
                <div className="flex flex-col gap-[20px] text-white">
                    <div className="flex justify-between items-center">
                        <h1 className="text-[24px] lg:text-[36px] font-[500]">
                            Manage Giveaways
                        </h1>
                        <button
                            onClick={() => navigate('/admin/dashboard/giveaway/create')}
                            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-colors"
                        >
                            Create New Giveaway
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {giveaways?.length === 0 ? (
                            <div className="col-span-full text-center py-10">
                                <p className="text-gray-400 text-lg">No giveaways found</p>
                                <p className="text-gray-500 mt-2">Create your first giveaway to get started</p>
                            </div>
                        ) : (
                            giveaways?.map((giveaway: any) => (
                                <GiveawayCardCompleted 
                                    key={giveaway.id} 
                                    giveaway={giveaway} 
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
} 
