import { useState, useEffect } from "react";
import Layout from "../../../../../layout/Admin"
import { usePrivy } from "@privy-io/react-auth"
import { baseSepolia } from "viem/chains";
import { publicClient } from "../../../../../config";
import { useBond } from "../../../../../hooks/web3/useBond";
import { createWalletClient, custom } from "viem";
import { useParams } from "react-router-dom";
import TxReceipt from "../../../../../components/Modal/TxReceipt";
import { IoWalletSharp } from "react-icons/io5";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import erc20Abi from "../../../../../abis/ERC20.json";
import BondABI from "../../../../../abis/Bond.json";
import { Link } from "react-router-dom";

const createViemWalletClient = () => {
    return createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum)
    });
};

export default function AdminBondManageID() {
    const { authenticated, login, user } = usePrivy();
    const { id } = useParams<{ id: `0x${string}` }>();
    const { data: bondData, error, loading, refetch } = useBond(id, { polling: false });

    const [taxSetting, setTaxSetting] = useState<{
        taxCollector: `0x${string}`,
        taxPercent: number,
        loading: boolean
    }>({
        taxCollector: "0x",
        taxPercent: 0,
        loading: false
    });

    const [linearVestingSetting, setLinearVestingSetting] = useState<{
        endOfLinearVesting: number,
        loading: boolean
    }>({
        endOfLinearVesting: 0,
        loading: false
    });

    const [stakingPool, setStakingPool] = useState<{
        address: `0x${string}`,
        loading: boolean
    }>({
        address: '0x',
        loading: false
    });

    const [cliffForms, setCliffForms] = useState<Array<{
        date: string,
        time: string,
        percentage: number
    }>>([{
        date: '',
        time: '',
        percentage: 0
    }]);

    const handleAddNewForm = () => {
        setCliffForms(prev => [...prev, {
            date: '',
            time: '',
            percentage: 0
        }]);
    };

    const handleFormChange = (index: number, field: string, value: string | number) => {
        setCliffForms(prev => prev.map((form, i) =>
            i === index ? { ...form, [field]: value } : form
        ));
    };

    const handleRemoveForm = (index: number) => {
        setCliffForms(prev => prev.filter((_, i) => i !== index));
    };

    async function handleSetTaxCollector(address: `0x${string}`) {
        const walletClient = createViemWalletClient();
        setTaxSetting(prev => ({ ...prev, loading: true }));

        try {
            const { request } = await publicClient.simulateContract({
                address: id as `0x${string}`,
                abi: BondABI,
                functionName: "setTaxCollector",
                args: [address]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Tax collector updated successfully");
            await refetch();
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to update tax collector");
        } finally {
            setTaxSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetTaxPercentage(percentage: number) {
        const walletClient = createViemWalletClient();
        setTaxSetting(prev => ({ ...prev, loading: true }));

        try {
            const { request } = await publicClient.simulateContract({
                address: id as `0x${string}`,
                abi: BondABI,
                functionName: "setTaxPercentage",
                args: [percentage]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Tax percentage updated successfully");
            await refetch();
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to update tax percentage");
        } finally {
            setTaxSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetStakingPool(address: `0x${string}`) {
        const walletClient = createViemWalletClient();
        setStakingPool(prev => ({ ...prev, loading: true }));

        try {
            const { request } = await publicClient.simulateContract({
                address: id as `0x${string}`,
                abi: BondABI,
                functionName: "setStakingPool",
                args: [address]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Staking pool updated successfully");
            await refetch();
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to update staking pool");
        } finally {
            setStakingPool(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetLinearVesting(endTime: number) {
        const walletClient = createViemWalletClient();
        setLinearVestingSetting(prev => ({ ...prev, loading: true }));

        try {
            const { request } = await publicClient.simulateContract({
                address: id as `0x${string}`,
                abi: BondABI,
                functionName: "setLinearVestingEndTime",
                args: [endTime]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Linear vesting end time updated successfully");
            await refetch();
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to update linear vesting end time");
        } finally {
            setLinearVestingSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetCliffPeriod() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();

        try {
            // Convert cliffForms to claimTimes and percentages
            const claimTimes = cliffForms.map(form => {
                const date = new Date(`${form.date}T${form.time}:00Z`);
                return Math.floor(date.getTime() / 1000);
            });

            const percentages = cliffForms.map(form => form.percentage);

            // Validate inputs
            if (claimTimes.length === 0) {
                toast.error("Input is empty");
                return;
            }

            if (claimTimes.length > 100) {
                toast.error("Input length cannot exceed 100");
                return;
            }

            const totalPercentage = percentages.reduce((sum, pct) => sum + pct, 0);
            if (totalPercentage !== 100) {
                toast.error("Total percentage must equal 100");
                return;
            }

            // Check if dates are in ascending order
            for (let i = 1; i < claimTimes.length; i++) {
                if (claimTimes[i - 1] >= claimTimes[i]) {
                    toast.error("Dates must be in ascending order");
                    return;
                }
            }

            const { request } = await publicClient.simulateContract({
                address: id as `0x${string}`,
                abi: BondABI,
                account,
                functionName: "setCliffPeriod",
                args: [claimTimes, percentages]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Cliff period successfully set");
            await refetch();
        } catch (error: any) {
            console.error(error);
            toast.error("Failed to set cliff period");
        }
    }

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

    return (
        <Layout>
            <div className="p-[40px_20px] lg:p-[100px_40px] font-space">
                <div className="flex flex-col gap-[20px] text-white">
                    <h1 className="text-[24px] lg:text-[36px] font-[500]">Manage Bond</h1>

                    {/* Tax Settings Section */}
                    <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                        <h3 className="text-xl font-semibold text-primary">Tax Settings</h3>
                        <div className="space-y-4">
                            <div className="flex flex-col space-y-2">
                                <p className="text-[#C4C4C4] text-sm">Tax Collector Address</p>
                                <div className="flex gap-x-2">
                                    <input
                                        type="text"
                                        value={taxSetting.taxCollector}
                                        onChange={(e) => setTaxSetting(prev => ({ ...prev, taxCollector: e.target.value as `0x${string}` }))}
                                        className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="0x..."
                                    />
                                    <button
                                        onClick={() => handleSetTaxCollector(taxSetting.taxCollector)}
                                        className="bg-primary/90 hover:bg-primary px-4 rounded-[8px] text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                    >
                                        Set
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <p className="text-[#C4C4C4] text-sm">Tax Percentage</p>
                                <div className="flex gap-x-2">
                                    <input
                                        type="number"
                                        value={taxSetting.taxPercent}
                                        onChange={(e) => setTaxSetting(prev => ({ ...prev, taxPercent: Number(e.target.value) }))}
                                        className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="Enter percentage"
                                    />
                                    <button
                                        onClick={() => handleSetTaxPercentage(taxSetting.taxPercent)}
                                        className="bg-primary/90 hover:bg-primary px-4 rounded-[8px] text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                    >
                                        Set
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Linear Vesting Settings */}
                    <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                        <h3 className="text-xl font-semibold text-primary">Linear Vesting Settings</h3>
                        <div className="flex flex-col space-y-2">
                            <p className="text-[#C4C4C4] text-sm">End Time (Unix Timestamp)</p>
                            <div className="flex gap-x-2">
                                <input
                                    type="number"
                                    value={linearVestingSetting.endOfLinearVesting}
                                    onChange={(e) => setLinearVestingSetting(prev => ({ ...prev, endOfLinearVesting: Number(e.target.value) }))}
                                    className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Enter end time"
                                />
                                <button
                                    onClick={() => handleSetLinearVesting(linearVestingSetting.endOfLinearVesting)}
                                    className="bg-primary/90 hover:bg-primary px-4 rounded-[8px] text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                >
                                    Set
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Staking Pool Settings */}
                    <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                        <h3 className="text-xl font-semibold text-primary">Staking Pool Settings</h3>
                        <div className="flex flex-col space-y-2">
                            <p className="text-[#C4C4C4] text-sm">Staking Pool Address</p>
                            <div className="flex gap-x-2">
                                <input
                                    type="text"
                                    value={stakingPool.address}
                                    onChange={(e) => setStakingPool(prev => ({ ...prev, address: e.target.value as `0x${string}` }))}
                                    className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="0x..."
                                />
                                <button
                                    onClick={() => handleSetStakingPool(stakingPool.address)}
                                    className="bg-primary/90 hover:bg-primary px-4 rounded-[8px] text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                >
                                    Set
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cliff Period Settings */}
                    <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                        <h3 className="text-xl font-semibold text-primary">Cliff Period Settings</h3>
                        <div className="space-y-4">
                            {cliffForms.map((form, index) => (
                                <div key={index} className="space-y-3 bg-[#17043B]/50 p-4 rounded-lg">
                                    <div className="flex gap-x-3">
                                        <div className="w-full">
                                            <p className="text-[#C4C4C4] text-sm mb-1">Date</p>
                                            <input
                                                type="date"
                                                value={form.date}
                                                onChange={(e) => handleFormChange(index, 'date', e.target.value)}
                                                className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[#C4C4C4] text-sm mb-1">Time</p>
                                            <input
                                                type="time"
                                                value={form.time}
                                                onChange={(e) => handleFormChange(index, 'time', e.target.value)}
                                                className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[#C4C4C4] text-sm mb-1">Percentage</p>
                                            <input
                                                type="number"
                                                step={1}
                                                min={0}
                                                max={100}
                                                value={form.percentage}
                                                onChange={(e) => handleFormChange(index, 'percentage', Number(e.target.value))}
                                                className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                                placeholder="Percentage"
                                            />
                                        </div>
                                    </div>
                                    {index > 0 && (
                                        <button
                                            onClick={() => handleRemoveForm(index)}
                                            className="text-red-500 hover:text-red-400 text-sm"
                                        >
                                            Remove this period
                                        </button>
                                    )}
                                </div>
                            ))}

                            <div className="flex gap-x-2">
                                <button
                                    onClick={handleAddNewForm}
                                    className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                >
                                    Add New Cliff Period
                                </button>
                                <button
                                    onClick={handleSetCliffPeriod}
                                    className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                >
                                    Save Cliff Periods
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
