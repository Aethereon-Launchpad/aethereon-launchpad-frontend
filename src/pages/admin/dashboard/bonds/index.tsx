import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallets, usePrivy } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import Layout from '../../../../layout/Admin';
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { useBond } from '../../../../hooks/web3/useBond';
import { format } from 'date-fns';
import { FaEdit, FaPause, FaPlay, FaMoneyBillWave, FaWallet } from 'react-icons/fa';

// Bond interface that matches the returned data from the hooks
interface Bond {
    id: string;
    address: string;
    metadataURI: string;
    paymentToken: any;
    saleToken: any;
    whitelistStartTime: number;
    saleStartTime: number;
    saleEndTime: number;
    withdrawDelay: number;
    owner: string;
    bondSize: string;
    bondType: number;
    fixedDiscount: number;
    initialDiscountPercentage: number;
    finalDiscountPercentage: number;
    currentDiscount: number;
    totalRaised: string;
    totalSold: string;
    isActive: boolean;
    bondInfo?: {
        projectName: string;
        description: string;
        images?: {
            logo?: string;
            bg?: string;
        };
    };
}

function AdminManageBonds() {
    const navigate = useNavigate();
    const { authenticated, login, user } = usePrivy();
    const { wallets } = useWallets();
    const [wallet, setWallet] = useState<any>(null);
    const { data, error, loading, refetch } = useBond(null, { polling: true });
    const [filter, setFilter] = useState<'all' | 'active' | 'upcoming' | 'ended'>('all');
    const [bonds, setBonds] = useState<Bond[]>([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (authenticated && wallets.length > 0) {
            const activeWallet = wallets[0];
            setWallet(activeWallet);

            // Check if user is admin (simplistic approach - in real app would check against a list or contract)
            setIsAdmin(true);
        }
    }, [authenticated, wallets, user]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            setBonds(data as Bond[]);
        }
    }, [data]);

    // Filter bonds based on selected filter
    const filteredBonds = bonds.filter((bond) => {
        const now = Math.floor(Date.now() / 1000);

        switch (filter) {
            case 'active':
                return bond.saleStartTime <= now && bond.saleEndTime > now;
            case 'upcoming':
                return bond.saleStartTime > now;
            case 'ended':
                return bond.saleEndTime <= now;
            default:
                return true;
        }
    });

    const handleCreateBond = () => {
        if (!authenticated) {
            login();
            return;
        }
        navigate('/admin/dashboard/bonds/create');
    };

    const handleRefresh = () => {
        refetch();
    };

    if (!authenticated) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-white">Connect Wallet to Access Admin Panel</h2>
                    <button
                        onClick={login}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-lg"
                    >
                        Connect Wallet
                    </button>
                </div>
            </Layout>
        );
    }

    if (!isAdmin) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4 text-white">Admin Access Required</h2>
                    <p className="text-gray-400 mb-6">You don't have permission to access this page.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-lg"
                    >
                        Go Home
                    </button>
                </div>
            </Layout>
        );
    }

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[500px]">
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

    return (
        <Layout>
            <div className="max-w-7xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Manage Bonds</h1>
                    <div className="space-x-4">
                        <button
                            onClick={handleRefresh}
                            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg"
                        >
                            Refresh
                        </button>
                        <button
                            onClick={handleCreateBond}
                            className="bg-primary hover:bg-primary/80 text-white py-2 px-6 rounded-lg"
                        >
                            Create Bond
                        </button>
                    </div>
                </div>

                {error.message && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg mb-6">
                        {error.message}
                    </div>
                )}

                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`px-4 py-2 rounded-full ${filter === 'active' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter('upcoming')}
                        className={`px-4 py-2 rounded-full ${filter === 'upcoming' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setFilter('ended')}
                        className={`px-4 py-2 rounded-full ${filter === 'ended' ? 'bg-primary text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                        Ended
                    </button>
                </div>

                {filteredBonds.length === 0 ? (
                    <div className="text-center py-12 text-gray-400">
                        <p>No bonds found for the selected filter</p>
                    </div>
                ) : (
                    <div className="bg-[#1A1A1A] rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-[#111111] text-left">
                                        <th className="p-4 text-gray-400 font-medium">Name</th>
                                        <th className="p-4 text-gray-400 font-medium">Type</th>
                                        <th className="p-4 text-gray-400 font-medium">Status</th>
                                        <th className="p-4 text-gray-400 font-medium">Start Date</th>
                                        <th className="p-4 text-gray-400 font-medium">End Date</th>
                                        <th className="p-4 text-gray-400 font-medium">Raised</th>
                                        <th className="p-4 text-gray-400 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBonds.map((bond) => {
                                        const now = Math.floor(Date.now() / 1000);
                                        const isActive = bond.saleStartTime <= now && bond.saleEndTime > now;
                                        const isUpcoming = bond.saleStartTime > now;
                                        const isEnded = bond.saleEndTime <= now;
                                        const bondName = bond.bondInfo?.projectName || 'Unnamed Bond';

                                        return (
                                            <tr
                                                key={bond.id}
                                                className="border-t border-gray-800 hover:bg-[#222222] transition-colors"
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center">
                                                        {bond.bondInfo?.images?.logo && (
                                                            <img
                                                                src={bond.bondInfo.images.logo}
                                                                alt={bondName}
                                                                className="w-8 h-8 rounded-full mr-3 object-contain"
                                                            />
                                                        )}
                                                        <div>
                                                            <p className="font-medium text-white">{bondName}</p>
                                                            <p className="text-xs text-gray-400 truncate max-w-[200px]">{bond.id}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-white">
                                                    {bond.bondType === 0 ? 'Dynamic' : 'Fixed'}
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs ${now < bond.whitelistStartTime
                                                            ? 'bg-purple-500/20 text-purple-500' // Before whitelist
                                                            : now >= bond.whitelistStartTime && now < bond.saleStartTime
                                                                ? 'bg-blue-500/20 text-blue-500' // During whitelist
                                                                : now >= bond.saleStartTime && now < bond.saleEndTime
                                                                    ? 'bg-green-500/20 text-green-500' // During sale
                                                                    : now >= bond.saleEndTime && now < (bond.saleEndTime + bond.withdrawDelay)
                                                                        ? 'bg-yellow-500/20 text-yellow-500' // During refund period
                                                                        : 'bg-gray-500/20 text-gray-500' // Ended
                                                            }`}
                                                    >
                                                        {now < bond.whitelistStartTime
                                                            ? 'Pre-Whitelist'
                                                            : now >= bond.whitelistStartTime && now < bond.saleStartTime
                                                                ? 'Whitelist'
                                                                : now >= bond.saleStartTime && now < bond.saleEndTime
                                                                    ? 'Active Sale'
                                                                    : now >= bond.saleEndTime && now < (bond.saleEndTime + bond.withdrawDelay)
                                                                        ? 'Refund Period'
                                                                        : 'Ended'}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-white">
                                                    {format(new Date(bond.saleStartTime * 1000), 'MMM dd, yyyy HH:mm')}
                                                </td>
                                                <td className="p-4 text-sm text-white">
                                                    {format(new Date(bond.saleEndTime * 1000), 'MMM dd, yyyy HH:mm')}
                                                </td>
                                                <td className="p-4 text-white">
                                                    {parseFloat(bond.totalSold || '0').toLocaleString()} {bond.saleToken?.symbol}
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => navigate(`/admin/dashboard/bonds/manage/${bond.id}`)}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
                                                            title="Manage Bond"
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/deals/bonds/fund/${bond.id}`)}
                                                            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                                                            title="Fund Bond"
                                                        >
                                                            <FaMoneyBillWave />
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/deals/bonds/cash/${bond.id}`)}
                                                            className="bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded"
                                                            title="Cash Bond"
                                                        >
                                                            <FaWallet />
                                                        </button>
                                                        {bond.isActive ? (
                                                            <button
                                                                className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                                                                title="Pause Bond"
                                                            >
                                                                <FaPause />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
                                                                title="Resume Bond"
                                                            >
                                                                <FaPlay />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default AdminManageBonds; 