import { useState } from "react";
import Layout from "../../../../layout/Admin";
import { useVoting } from "../../../../hooks/web3/useVoting";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { Link } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';

export default function AdminManageVoting() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data, error, loading, refetch } = useVoting();

    const filteredData = data.filter((votingSlot: any) => {
        const name = votingSlot?.name?.toLowerCase() || '';
        const contractAddress = votingSlot.id?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();
        return name.includes(search) || contractAddress.includes(search);
    });

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
        return (
            <div className="flex items-center justify-center">
                <h3 className="text-red-600 text-xl">{error.message}</h3>
            </div>
        );
    }

    return (
        <Layout>
            <section className="p-8 text-white space-y-8">
                <img src="/der-mob.svg" alt="" />
                <h1 className="font-space text-xl font-semibold text-primary">Manage Voting Slots</h1>
                <div className="flex gap-5 mb-4">
                    <Link
                        to="/admin/dashboard/voting/create"
                        className="px-4 py-2 bg-primary text-black rounded hover:bg-primary-300 transition-colors"
                    >
                        Create New Voting Slot
                    </Link>
                </div>
                <div className="space-y-5">
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="searchTerm" className="text-sm font-medium">
                            Search by Name or Contract Address
                        </label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Enter name or contract address..."
                            className="p-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="grid gap-[40px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-[40px]">
                        {filteredData.map((votingSlot: any, i: number) => (
                            <VotingSlotCard votingSlot={votingSlot} key={i} />
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}

function VotingSlotCard({ votingSlot }: { votingSlot: any }) {
    const timeUntilStart = formatDistanceToNow(new Date(votingSlot.voteStartDate * 1000), { addSuffix: true });
    const timeUntilEnd = formatDistanceToNow(new Date(votingSlot.voteEndDate * 1000), { addSuffix: true });
    const now = Date.now() / 1000;
    
    const getStatus = () => {
        if (now < votingSlot.voteStartDate) {
            return "Pending";
        } else if (now >= votingSlot.voteStartDate && now <= votingSlot.voteEndDate) {
            return "Active";
        } else {
            return "Ended";
        }
    };

    const getStatusColor = () => {
        switch (getStatus()) {
            case "Pending":
                return "text-yellow-500";
            case "Active":
                return "text-green-500";
            case "Ended":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };

    return (
        <div className="bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-200">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-primary truncate">
                        {votingSlot.name}
                    </h3>
                    <span className={`text-sm font-medium ${getStatusColor()}`}>
                        {getStatus()}
                    </span>
                </div>
                
                <div className="space-y-2">
                    <p className="text-sm text-gray-300 truncate">
                        {votingSlot.description}
                    </p>
                    <p className="text-xs text-gray-400">
                        Contract: {votingSlot.id.slice(0, 6)}...{votingSlot.id.slice(-4)}
                    </p>
                </div>

                <div className="space-y-1">
                    <p className="text-sm">
                        <span className="text-gray-400">Starts:</span> {timeUntilStart}
                    </p>
                    <p className="text-sm">
                        <span className="text-gray-400">Ends:</span> {timeUntilEnd}
                    </p>
                    <p className="text-sm">
                        <span className="text-gray-400">Max Free Votes/Day:</span> {votingSlot.maxFreeVotesPerDay}
                    </p>
                </div>

                <Link
                    to={`/admin/dashboard/voting/manage/${votingSlot.id}`}
                    className="block w-full text-center bg-primary/90 hover:bg-primary py-2 rounded-[8px] text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
                >
                    Manage Voting Slot
                </Link>
            </div>
        </div>
    );
} 