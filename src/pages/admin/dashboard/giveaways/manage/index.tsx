import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "../../../../../layout/Admin";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useGiveaway } from "../../../../../hooks/web3/useGiveaway";
import { createWalletClient, custom } from "viem";
import { useChain } from "../../../../../context/ChainContext";
import { Preloader, ThreeDots } from 'react-preloader-icon';
import { toast } from "react-hot-toast";
import { ethers } from "ethers";
import AirdropABI from "../../../../../abis/Airdrop.json";
import erc20Abi from "../../../../../abis/ERC20.json";
import { IoWalletSharp } from "react-icons/io5";
import { formatSeconds } from "../../../../../utils/timeFormatter";
import { getContractAddress } from "../../../../../utils/source";
import { FaCopy } from "react-icons/fa6";

// The createViemWalletClient function will be defined inside the component

export default function AdminGiveawayManageID() {
    const { authenticated, login, user } = usePrivy();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data, error, loading, refetch } = useGiveaway(id, { polling: false });
    const { wallets } = useWallets();
    const wallet = wallets[0];
    console.log(wallet)
    const { publicClient, selectedChain } = useChain();

    // Define createViemWalletClient inside the component to access the chain context
    const createViemWalletClient = () => {
        return createWalletClient({
            chain: publicClient.chain, // Use the chain from the ChainContext
            transport: custom(window.ethereum as any)
        });
    };

    // Helper function to get the chain name
    const getChainName = () => {
        return selectedChain === "84532" ? "Base Sepolia" :
            selectedChain === "57054" ? "Sonic" : "Rise";
    };

    // Log when the selected chain changes
    useEffect(() => {
        console.log(`GiveawayManager: Chain changed to ${getChainName()} (${selectedChain})`);
    }, [selectedChain]);

    // State variables for different settings
    const [airdropTypeSetting, setAirdropTypeSetting] = useState<{ loading: boolean }>({
        loading: false
    });

    const [stakingPoolSetting, setStakingPoolSetting] = useState<{ address: `0x${string}`, loading: boolean }>({
        address: '0x',
        loading: false
    });

    const [tokenPerUserSetting, setTokenPerUserSetting] = useState<{ amount: number, loading: boolean }>({
        amount: 0,
        loading: false
    });

    const [multiplierSetting, setMultiplierSetting] = useState<{ value: number, loading: boolean }>({
        value: 0,
        loading: false
    });

    const [whitelistPeriodSetting, setWhitelistPeriodSetting] = useState<{
        startTime: number,
        endTime: number,
        loading: boolean
    }>({
        startTime: 0,
        endTime: 0,
        loading: false
    });

    const [withdrawDelaySetting, setWithdrawDelaySetting] = useState<{
        delay: number,
        loading: boolean
    }>({
        delay: 0,
        loading: false
    });

    const [linearVestingSetting, setLinearVestingSetting] = useState<{
        endOfLinearVesting: number,
        loading: boolean
    }>({
        endOfLinearVesting: 0,
        loading: false
    });

    const [cliffPeriods, setCliffPeriods] = useState<{
        claimTimes: number[],
        percentages: number[],
        loading: boolean
    }>({
        claimTimes: [],
        percentages: [],
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

    const [userAddress, setUserAddress] = useState<string>("");
    const [isAddingToWhitelist, setIsAddingToWhitelist] = useState<boolean>(false);

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

    async function handleToggleAirdropType() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        setAirdropTypeSetting(prev => ({ ...prev, loading: true }));

        console.log(`Toggling airdrop type on chain ${getChainName()} (${selectedChain})`);

        try {
            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "toggleAirdropType"
            });

            const hash = await walletClient.writeContract(request);
            toast.success(`Successfully changed airdrop type to ${data.isPrivateAirdrop ? "Public" : "Private"}`);

            console.log(`Transaction submitted with hash: ${hash} on chain ${getChainName()}`);
            await new Promise(resolve => setTimeout(resolve, 3000));

            console.log(`Checking transaction receipt on chain ${getChainName()}`);
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                console.log(`Transaction confirmed successfully on chain ${getChainName()}`);
                await refetch();
            }
        } catch (error: any) {
            console.error(`Error toggling airdrop type on chain ${getChainName()}:`, error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("whitelist already started")) {
                toast.error("Cannot change airdrop type after whitelist has started");
            } else if (error.message.includes("network disconnected") || error.message.includes("network error")) {
                toast.error(`Network error on ${getChainName()} Testnet. Please try again later.`);
            } else if (error.message.includes("contract not deployed")) {
                toast.error(`Contract not deployed on ${getChainName()} Testnet. Please switch to a supported chain.`);
            } else {
                toast.error("Failed to change airdrop type");
            }
        } finally {
            setAirdropTypeSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetStakingPool() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        setStakingPoolSetting(prev => ({ ...prev, loading: true }));

        console.log(`Setting staking pool on chain ${getChainName()} (${selectedChain})`);

        if (stakingPoolSetting.address === "0x") {
            setStakingPoolSetting(prev => ({ ...prev, loading: false }));
            toast.error("Invalid staking pool address");
            return;
        }

        try {
            // Make sure wallet is on the correct chain
            if (!wallet.chainId.includes(selectedChain)) {
                console.log(`Switching wallet to chain ${getChainName()} (${selectedChain})`);
                await wallet.switchChain(parseInt(selectedChain));
            }

            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "setStakingPool",
                args: [stakingPoolSetting.address]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Successfully set staking pool");

            console.log(`Transaction submitted with hash: ${hash} on chain ${getChainName()}`);
            await new Promise(resolve => setTimeout(resolve, 3000));

            console.log(`Checking transaction receipt on chain ${getChainName()}`);
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                console.log(`Transaction confirmed successfully on chain ${getChainName()}`);
                await refetch();
            }
        } catch (error: any) {
            console.error(`Error setting staking pool on chain ${getChainName()}:`, error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("not owner")) {
                toast.error("Only the owner can set the staking pool");
            } else if (error.message.includes("network disconnected") || error.message.includes("network error")) {
                toast.error(`Network error on ${getChainName()} Testnet. Please try again later.`);
            } else if (error.message.includes("contract not deployed")) {
                toast.error(`Contract not deployed on ${getChainName()} Testnet. Please switch to a supported chain.`);
            } else {
                toast.error("Failed to set staking pool");
            }
        } finally {
            setStakingPoolSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetTokenPerUser() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        setTokenPerUserSetting(prev => ({ ...prev, loading: true }));

        console.log(`Setting token per user on chain ${getChainName()} (${selectedChain})`);

        if (tokenPerUserSetting.amount <= 0) {
            setTokenPerUserSetting(prev => ({ ...prev, loading: false }));
            toast.error("Token amount must be greater than 0");
            return;
        }

        try {
            // Make sure wallet is on the correct chain
            if (wallet.chainId !== selectedChain) {
                console.log(`Switching wallet to chain ${getChainName()} (${selectedChain})`);
                await wallet.switchChain(parseInt(selectedChain));
            }

            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "setTokenPerUser",
                args: [tokenPerUserSetting.amount]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Successfully set token per user");

            console.log(`Transaction submitted with hash: ${hash} on chain ${getChainName()}`);
            await new Promise(resolve => setTimeout(resolve, 3000));

            console.log(`Checking transaction receipt on chain ${getChainName()}`);
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                console.log(`Transaction confirmed successfully on chain ${getChainName()}`);
                await refetch();
            }
        } catch (error: any) {
            console.error(`Error setting token per user on chain ${getChainName()}:`, error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("not owner")) {
                toast.error("Only the owner can set token per user");
            } else if (error.message.includes("whitelist already started")) {
                toast.error("Cannot change token per user after whitelist has started");
            } else if (error.message.includes("network disconnected") || error.message.includes("network error")) {
                toast.error(`Network error on ${getChainName()} Testnet. Please try again later.`);
            } else if (error.message.includes("contract not deployed")) {
                toast.error(`Contract not deployed on ${getChainName()} Testnet. Please switch to a supported chain.`);
            } else {
                toast.error("Failed to set token per user");
            }
        } finally {
            setTokenPerUserSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetMultiplier() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        setMultiplierSetting(prev => ({ ...prev, loading: true }));

        console.log(`Setting multiplier on chain ${getChainName()} (${selectedChain})`);

        if (multiplierSetting.value <= 0 || multiplierSetting.value > 100000) {
            setMultiplierSetting(prev => ({ ...prev, loading: false }));
            toast.error("Multiplier must be between 1 and 100000");
            return;
        }

        try {
            // Make sure wallet is on the correct chain
            if (wallet.chainId !== selectedChain) {
                console.log(`Switching wallet to chain ${getChainName()} (${selectedChain})`);
                await wallet.switchChain(parseInt(selectedChain));
            }

            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "setMultiplier",
                args: [multiplierSetting.value]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Successfully set multiplier");

            console.log(`Transaction submitted with hash: ${hash} on chain ${getChainName()}`);
            await new Promise(resolve => setTimeout(resolve, 3000));

            console.log(`Checking transaction receipt on chain ${getChainName()}`);
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                console.log(`Transaction confirmed successfully on chain ${getChainName()}`);
                await refetch();
            }
        } catch (error: any) {
            console.error(`Error setting multiplier on chain ${getChainName()}:`, error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("not owner")) {
                toast.error("Only the owner can set multiplier");
            } else if (error.message.includes("Invalid multiplier")) {
                toast.error("Invalid multiplier value");
            } else if (error.message.includes("network disconnected") || error.message.includes("network error")) {
                toast.error(`Network error on ${getChainName()} Testnet. Please try again later.`);
            } else if (error.message.includes("contract not deployed")) {
                toast.error(`Contract not deployed on ${getChainName()} Testnet. Please switch to a supported chain.`);
            } else {
                toast.error("Failed to set multiplier");
            }
        } finally {
            setMultiplierSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetWhitelistPeriod() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        setWhitelistPeriodSetting(prev => ({ ...prev, loading: true }));

        console.log(`Setting whitelist period on chain ${getChainName()} (${selectedChain})`);

        // Make sure wallet is on the correct chain
        if (wallet.chainId !== selectedChain) {
            console.log(`Switching wallet to chain ${getChainName()} (${selectedChain})`);
            await wallet.switchChain(parseInt(selectedChain));
        }

        const now = Math.floor(Date.now() / 1000);

        if (whitelistPeriodSetting.startTime <= now) {
            setWhitelistPeriodSetting(prev => ({ ...prev, loading: false }));
            toast.error("Start time must be in the future");
            return;
        }

        if (whitelistPeriodSetting.endTime <= whitelistPeriodSetting.startTime) {
            setWhitelistPeriodSetting(prev => ({ ...prev, loading: false }));
            toast.error("End time must be after start time");
            return;
        }

        try {
            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "setWhitelistPeriod",
                args: [
                    whitelistPeriodSetting.startTime,
                    whitelistPeriodSetting.endTime
                ]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Successfully set whitelist period");

            await new Promise(resolve => setTimeout(resolve, 3000));
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                await refetch();
            }
        } catch (error: any) {
            console.error(error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("not owner")) {
                toast.error("Only the owner can set whitelist period");
            } else if (error.message.includes("whitelist already started")) {
                toast.error("Cannot change whitelist period after whitelist has started");
            } else if (error.message.includes("start timestamp too early")) {
                toast.error("Start time must be in the future");
            } else if (error.message.includes("end timestamp before start")) {
                toast.error("End time must be after start time");
            } else if (error.message.includes("start time has to be within 1 year")) {
                toast.error("Start time must be within 1 year from now");
            } else if (error.message.includes("end time has to be within 10 years")) {
                toast.error("End time must be within 10 years from start time");
            } else {
                toast.error("Failed to set whitelist period");
            }
        } finally {
            setWhitelistPeriodSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetWithdrawDelay() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        setWithdrawDelaySetting(prev => ({ ...prev, loading: true }));

        console.log(`Setting withdraw delay on chain ${getChainName()} (${selectedChain})`);

        // Make sure wallet is on the correct chain
        if (wallet.chainId !== selectedChain) {
            console.log(`Switching wallet to chain ${getChainName()} (${selectedChain})`);
            await wallet.switchChain(parseInt(selectedChain));
        }

        if (withdrawDelaySetting.delay <= 0) {
            setWithdrawDelaySetting(prev => ({ ...prev, loading: false }));
            toast.error("Withdraw delay must be greater than 0");
            return;
        }

        try {
            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "setWithdrawDelay",
                args: [withdrawDelaySetting.delay]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Successfully set withdraw delay");

            await new Promise(resolve => setTimeout(resolve, 3000));
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                await refetch();
            }
        } catch (error: any) {
            console.error(error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("not owner")) {
                toast.error("Only the owner can set withdraw delay");
            } else if (error.message.includes("whitelist already started")) {
                toast.error("Cannot change withdraw delay after whitelist has started");
            } else if (error.message.includes("withdrawDelay has to be within 5 years")) {
                toast.error("Withdraw delay must be less than 5 years");
            } else {
                toast.error("Failed to set withdraw delay");
            }
        } finally {
            setWithdrawDelaySetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetLinearVesting() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        setLinearVestingSetting(prev => ({ ...prev, loading: true }));

        console.log(`Setting linear vesting on chain ${getChainName()} (${selectedChain})`);

        // Make sure wallet is on the correct chain
        if (wallet.chainId !== selectedChain) {
            console.log(`Switching wallet to chain ${getChainName()} (${selectedChain})`);
            await wallet.switchChain(parseInt(selectedChain));
        }

        const withdrawTime = data.whitelistEndTime + data.withdrawDelay;
        if (linearVestingSetting.endOfLinearVesting <= withdrawTime) {
            setLinearVestingSetting(prev => ({ ...prev, loading: false }));
            toast.error("Linear vesting end time must be after withdraw start time");
            return;
        }

        try {
            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "setLinearVestingEndTime",
                args: [linearVestingSetting.endOfLinearVesting]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Successfully set linear vesting end time");

            await new Promise(resolve => setTimeout(resolve, 3000));
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                await refetch();
            }
        } catch (error: any) {
            console.error(error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("not owner")) {
                toast.error("Only the owner can set linear vesting end time");
            } else if (error.message.includes("vesting end time has to be after withdrawal start time")) {
                toast.error("Linear vesting end time must be after withdraw start time");
            } else {
                toast.error("Failed to set linear vesting end time");
            }
        } finally {
            setLinearVestingSetting(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleSetCliffPeriod() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();
        setCliffPeriods(prev => ({ ...prev, loading: true }));

        console.log(`Setting cliff period on chain ${getChainName()} (${selectedChain})`);

        // Make sure wallet is on the correct chain
        if (wallet.chainId !== selectedChain) {
            console.log(`Switching wallet to chain ${getChainName()} (${selectedChain})`);
            await wallet.switchChain(parseInt(selectedChain));
        }

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
                setCliffPeriods(prev => ({ ...prev, loading: false }));
                return;
            }

            if (claimTimes.length > 100) {
                toast.error("Input length cannot exceed 100");
                setCliffPeriods(prev => ({ ...prev, loading: false }));
                return;
            }

            const totalPercentage = percentages.reduce((sum, pct) => sum + pct, 0);
            if (totalPercentage !== 100) {
                toast.error("Total percentage must equal 100");
                setCliffPeriods(prev => ({ ...prev, loading: false }));
                return;
            }

            // Check if dates are in ascending order
            for (let i = 1; i < claimTimes.length; i++) {
                if (claimTimes[i - 1] >= claimTimes[i]) {
                    toast.error("Dates must be in ascending order");
                    setCliffPeriods(prev => ({ ...prev, loading: false }));
                    return;
                }
            }

            const withdrawTime = data.whitelistEndTime + data.withdrawDelay;
            if (claimTimes[0] <= withdrawTime) {
                toast.error("First claim time must be after withdrawal period");
                setCliffPeriods(prev => ({ ...prev, loading: false }));
                return;
            }

            // Make the contract call
            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "setCliffPeriod",
                args: [claimTimes, percentages]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Cliff period successfully set");

            await new Promise(resolve => setTimeout(resolve, 3000));
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                await refetch();
            }
        } catch (error: any) {
            console.error(error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("not owner")) {
                toast.error("Only the owner can set cliff period");
            } else if (error.message.includes("first claim time is before end time + withdraw delay")) {
                toast.error("First claim time must be after withdrawal period");
            } else if (error.message.includes("dates not in ascending order")) {
                toast.error("Dates must be in ascending order");
            } else if (error.message.includes("total input percentage doesn't equal to 100")) {
                toast.error("Total percentage must equal 100");
            } else {
                toast.error("Failed to set cliff period");
            }
        } finally {
            setCliffPeriods(prev => ({ ...prev, loading: false }));
        }
    }

    async function handleAddUserToWhitelist() {
        const walletClient = createViemWalletClient();
        const [account] = await walletClient.getAddresses();

        console.log(`Adding user to whitelist on chain ${getChainName()} (${selectedChain})`);

        if (!ethers.isAddress(userAddress)) {
            toast.error("Invalid address");
            return;
        }

        // Make sure wallet is on the correct chain
        if (wallet.chainId !== selectedChain) {
            console.log(`Switching wallet to chain ${getChainName()} (${selectedChain})`);
            await wallet.switchChain(parseInt(selectedChain));
        }

        setIsAddingToWhitelist(true);

        try {
            const { request } = await publicClient.simulateContract({
                address: data.id as `0x${string}`,
                abi: AirdropABI,
                account,
                functionName: "addToWhitelist",
                args: [userAddress as `0x${string}`]
            });

            const hash = await walletClient.writeContract(request);
            toast.success("Successfully added user to whitelist");

            await new Promise(resolve => setTimeout(resolve, 3000));
            const receipt = await publicClient.getTransactionReceipt({
                hash
            });

            if (receipt.status === "success") {
                setUserAddress("");
                await refetch();
            }
        } catch (error: any) {
            console.error(error.message);
            if (error.message.includes("User rejected the request")) {
                toast.error("User rejected the request");
            } else if (error.message.includes("not manager")) {
                toast.error("Only managers can add to whitelist");
            } else {
                toast.error("Failed to add user to whitelist");
            }
        } finally {
            setIsAddingToWhitelist(false);
        }
    }

    function DeadlineCounter({ deadline }: { deadline: number }) {
        const [timeLeft, setTimeLeft] = useState<number>(0);

        useEffect(() => {
            const interval = setInterval(() => {
                const now = Math.floor(Date.now() / 1000);
                const timeRemaining = deadline - now;
                setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
            }, 1000);

            return () => clearInterval(interval);
        }, [deadline]);

        const days = Math.floor(timeLeft / 86400);
        const hours = Math.floor((timeLeft % 86400) / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            return (
                <div className="text-red-500 font-medium">
                    Deadline Passed
                </div>
            );
        }

        return (
            <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-primary text-sm">{days}d</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-primary text-sm">{hours}h</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-primary text-sm">{minutes}m</p>
                </div>
                <div className="bg-primary/10 p-2 rounded-lg">
                    <p className="text-primary text-sm">{seconds}s</p>
                </div>
            </div>
        );
    }

    return (
        <Layout>
            <section className="min-h-screen bg-black p-5 text-white font-space">
                <div className="flex flex-col items-center justify-center max-w-2xl mx-auto my-10 space-y-8">
                    <div className="w-full space-y-4">
                        <div className="flex flex-col items-center space-y-4">
                            {data?.giveawayInfo?.images?.logo && (
                                <img
                                    src={data.giveawayInfo.images.logo}
                                    className="h-[80px] w-[80px] object-contain rounded-full border-2 border-primary/30"
                                    alt=""
                                />
                            )}
                            <div className="text-center">
                                <p className='text-primary text-[28px] lg:text-[36px] font-[700] uppercase tracking-[3px] mb-2'>
                                    Manage {data?.giveawayInfo?.projectName || "Giveaway"}
                                </p>
                                <p className="py-3 flex gap-x-1 items-center justify-center space-x-2 cursor-pointer" onClick={() => {
                                    navigator.clipboard.writeText(data.id)
                                    toast.success("Copied to clipboard!")
                                }}>
                                    {data.id} <FaCopy />
                                </p>
                                <div className="inline-flex items-center gap-2 bg-[#291254] px-4 py-2 rounded-full">
                                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                    <span className="text-sm font-medium">
                                        {getChainName()} Testnet
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-[200px]">
                            <Preloader
                                use={ThreeDots}
                                size={60}
                                strokeWidth={6}
                                strokeColor="#5325A9"
                                duration={2000}
                            />
                        </div>
                    ) : error.message ? (
                        <div className="text-red-500 text-center">Error loading giveaway: {error.message}</div>
                    ) : data ? (
                        <>
                            {/* Countdown to whitelist start */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Whitelist Start Countdown</h3>
                                <div className="flex justify-center">
                                    <DeadlineCounter deadline={Number(data.whitelistStartTime)} />
                                </div>
                            </div>

                            {/* Navigation buttons */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Quick Actions</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <Link
                                            to={`/admin/dashboard/giveaways/fund/${id}`}
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                        >
                                            Fund Giveaway
                                        </Link>
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        <Link
                                            to="/admin/dashboard/giveaways"
                                            className="bg-transparent border border-white hover:bg-white/10 w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                        >
                                            Back to List
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Airdrop Type Settings */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Airdrop Type</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-[#C4C4C4] text-sm">
                                            Current Type: {data.isPrivateAirdrop ? "Private Airdrop" : "Public Airdrop"}
                                        </label>
                                        <button
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            onClick={handleToggleAirdropType}
                                            disabled={!authenticated || airdropTypeSetting.loading}
                                        >
                                            {airdropTypeSetting.loading ? (
                                                <Preloader
                                                    use={ThreeDots}
                                                    size={60}
                                                    strokeWidth={6}
                                                    strokeColor="#FFF"
                                                    duration={2000}
                                                />
                                            ) : (
                                                `Switch to ${data.isPrivateAirdrop ? "Public Airdrop" : "Private Airdrop"}`
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Staking Pool Settings */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Staking Pool</h3>
                                <p>Current Lock & Stake : {getContractAddress("stakeLock")}</p>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-[#C4C4C4] text-sm">
                                            Current: {data.stakingPool === "0x0000000000000000000000000000000000000000" ? "Not Set" : data.stakingPool}
                                        </label>
                                        <input
                                            type="text"
                                            value={stakingPoolSetting.address}
                                            onChange={(e) => setStakingPoolSetting(prev => ({ ...prev, address: e.target.value as `0x${string}` }))}
                                            className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Enter staking pool address"
                                        />
                                        <button
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            onClick={handleSetStakingPool}
                                            disabled={!authenticated || stakingPoolSetting.loading}
                                        >
                                            {stakingPoolSetting.loading ? (
                                                <Preloader
                                                    use={ThreeDots}
                                                    size={60}
                                                    strokeWidth={6}
                                                    strokeColor="#FFF"
                                                    duration={2000}
                                                />
                                            ) : (
                                                'Set Staking Pool'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Token Per User Settings */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Token Per User</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-[#C4C4C4] text-sm">
                                            Current: {data.tokenPerUser || "Not Set"}
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={tokenPerUserSetting.amount}
                                            onChange={(e) => setTokenPerUserSetting(prev => ({ ...prev, amount: Number(e.target.value) }))}
                                            className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Enter token amount per user"
                                        />
                                        <button
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            onClick={handleSetTokenPerUser}
                                            disabled={!authenticated || tokenPerUserSetting.loading}
                                        >
                                            {tokenPerUserSetting.loading ? (
                                                <Preloader
                                                    use={ThreeDots}
                                                    size={60}
                                                    strokeWidth={6}
                                                    strokeColor="#FFF"
                                                    duration={2000}
                                                />
                                            ) : (
                                                'Set Token Per User'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Multiplier Settings */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Multiplier</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-[#C4C4C4] text-sm">
                                            Current: {data.multiplier ? `${data.multiplier / 10000}x` : "Not Set"}
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="100000"
                                            step="1"
                                            value={multiplierSetting.value}
                                            onChange={(e) => setMultiplierSetting(prev => ({ ...prev, value: Number(e.target.value) }))}
                                            className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Enter multiplier value (1-100000)"
                                        />
                                        <button
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            onClick={handleSetMultiplier}
                                            disabled={!authenticated || multiplierSetting.loading}
                                        >
                                            {multiplierSetting.loading ? (
                                                <Preloader
                                                    use={ThreeDots}
                                                    size={60}
                                                    strokeWidth={6}
                                                    strokeColor="#FFF"
                                                    duration={2000}
                                                />
                                            ) : (
                                                'Set Multiplier'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Whitelist Period Settings */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Whitelist Period</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-[#C4C4C4] text-sm">
                                            Current Start: {new Date(data.whitelistStartTime * 1000).toLocaleString()}
                                        </label>
                                        <label className="text-[#C4C4C4] text-sm">
                                            Current End: {new Date(data.whitelistEndTime * 1000).toLocaleString()}
                                        </label>
                                        <div className="flex gap-x-3">
                                            <div className="w-full">
                                                <p className="text-[#C4C4C4] text-sm mb-1">Start Date & Time</p>
                                                <input
                                                    type="datetime-local"
                                                    onChange={(e) => {
                                                        const date = new Date(e.target.value);
                                                        setWhitelistPeriodSetting(prev => ({
                                                            ...prev,
                                                            startTime: Math.floor(date.getTime() / 1000)
                                                        }));
                                                    }}
                                                    className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                            <div className="w-full">
                                                <p className="text-[#C4C4C4] text-sm mb-1">End Date & Time</p>
                                                <input
                                                    type="datetime-local"
                                                    onChange={(e) => {
                                                        const date = new Date(e.target.value);
                                                        setWhitelistPeriodSetting(prev => ({
                                                            ...prev,
                                                            endTime: Math.floor(date.getTime() / 1000)
                                                        }));
                                                    }}
                                                    className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                        </div>
                                        <button
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            onClick={handleSetWhitelistPeriod}
                                            disabled={!authenticated || whitelistPeriodSetting.loading}
                                        >
                                            {whitelistPeriodSetting.loading ? (
                                                <Preloader
                                                    use={ThreeDots}
                                                    size={60}
                                                    strokeWidth={6}
                                                    strokeColor="#FFF"
                                                    duration={2000}
                                                />
                                            ) : (
                                                'Set Whitelist Period'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Withdraw Delay Settings */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Withdraw Delay</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-[#C4C4C4] text-sm">
                                            Current: {formatSeconds(data.withdrawDelay)}
                                        </label>
                                        <div className="grid grid-cols-4 gap-2">
                                            <input
                                                type="number"
                                                min={0}
                                                placeholder="Days"
                                                onChange={(e) => {
                                                    const days = Number(e.target.value) * 86400;
                                                    setWithdrawDelaySetting(prev => ({
                                                        ...prev,
                                                        delay: prev.delay % 86400 + days
                                                    }));
                                                }}
                                                className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                            <input
                                                type="number"
                                                min={0}
                                                max={23}
                                                placeholder="Hours"
                                                onChange={(e) => {
                                                    const hours = Number(e.target.value) * 3600;
                                                    setWithdrawDelaySetting(prev => ({
                                                        ...prev,
                                                        delay: (Math.floor(prev.delay / 86400) * 86400) + hours + (prev.delay % 3600)
                                                    }));
                                                }}
                                                className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                            <input
                                                type="number"
                                                min={0}
                                                max={59}
                                                placeholder="Minutes"
                                                onChange={(e) => {
                                                    const minutes = Number(e.target.value) * 60;
                                                    setWithdrawDelaySetting(prev => ({
                                                        ...prev,
                                                        delay: (Math.floor(prev.delay / 3600) * 3600) + minutes + (prev.delay % 60)
                                                    }));
                                                }}
                                                className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                            <input
                                                type="number"
                                                min={0}
                                                max={59}
                                                placeholder="Seconds"
                                                onChange={(e) => {
                                                    const seconds = Number(e.target.value);
                                                    setWithdrawDelaySetting(prev => ({
                                                        ...prev,
                                                        delay: (Math.floor(prev.delay / 60) * 60) + seconds
                                                    }));
                                                }}
                                                className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                        <button
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            onClick={handleSetWithdrawDelay}
                                            disabled={!authenticated || withdrawDelaySetting.loading}
                                        >
                                            {withdrawDelaySetting.loading ? (
                                                <Preloader
                                                    use={ThreeDots}
                                                    size={60}
                                                    strokeWidth={6}
                                                    strokeColor="#FFF"
                                                    duration={2000}
                                                />
                                            ) : (
                                                'Set Withdraw Delay'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Linear Vesting Settings */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Linear Vesting</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <label className="text-[#C4C4C4] text-sm">
                                            Current End Time: {data.linearVestingEndTime === 0 ? "Not Set" : new Date(data.linearVestingEndTime * 1000).toLocaleString()}
                                        </label>
                                        <input
                                            type="datetime-local"
                                            onChange={(e) => {
                                                const date = new Date(e.target.value);
                                                setLinearVestingSetting(prev => ({
                                                    ...prev,
                                                    endOfLinearVesting: Math.floor(date.getTime() / 1000)
                                                }));
                                            }}
                                            className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                        <button
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            onClick={handleSetLinearVesting}
                                            disabled={!authenticated || linearVestingSetting.loading}
                                        >
                                            {linearVestingSetting.loading ? (
                                                <Preloader
                                                    use={ThreeDots}
                                                    size={60}
                                                    strokeWidth={6}
                                                    strokeColor="#FFF"
                                                    duration={2000}
                                                />
                                            ) : (
                                                'Set Linear Vesting End Time'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Cliff Period Settings */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Cliff Period Settings</h3>

                                {data.cliffPeriod && data.cliffPeriod.length > 0 && (
                                    <div className="bg-[#17043B] p-4 rounded-lg space-y-4">
                                        <h4 className="text-lg font-semibold">Current Cliff Periods</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {data.cliffPeriod.map((period: any, index: number) => (
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

                                    <button
                                        onClick={handleAddNewForm}
                                        className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                    >
                                        Add New Cliff Period
                                    </button>

                                    <button
                                        onClick={handleSetCliffPeriod}
                                        className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                        disabled={!authenticated || cliffPeriods.loading}
                                    >
                                        {cliffPeriods.loading ? (
                                            <Preloader
                                                use={ThreeDots}
                                                size={60}
                                                strokeWidth={6}
                                                strokeColor="#FFF"
                                                duration={2000}
                                            />
                                        ) : (
                                            'Set Cliff Periods'
                                        )}
                                    </button>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Note: Setting cliff periods will remove linear vesting, and vice versa.
                                        <br />
                                        Make sure the percentages sum to 100% and dates are in ascending order.
                                    </p>
                                </div>
                            </div>

                            {/* Add to Whitelist */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20 space-y-6">
                                <h3 className="text-xl font-semibold text-primary">Add User to Whitelist</h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col space-y-2">
                                        <input
                                            type="text"
                                            value={userAddress}
                                            onChange={(e) => setUserAddress(e.target.value)}
                                            className="w-full h-[50px] bg-[#291254]/50 border border-primary/20 rounded-[8px] px-4 outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Enter wallet address to whitelist"
                                        />
                                        <button
                                            className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            onClick={handleAddUserToWhitelist}
                                            disabled={!authenticated || isAddingToWhitelist}
                                        >
                                            {isAddingToWhitelist ? (
                                                <Preloader
                                                    use={ThreeDots}
                                                    size={60}
                                                    strokeWidth={6}
                                                    strokeColor="#FFF"
                                                    duration={2000}
                                                />
                                            ) : (
                                                'Add to Whitelist'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Wallet Connection Section */}
                            <div className="w-full bg-[#12092B]/50 p-6 rounded-xl border border-primary/20">
                                {authenticated ? (
                                    <button
                                        onClick={login}
                                        className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                    >
                                        <IoWalletSharp className="w-5 h-5" />
                                        <span>Disconnect Wallet</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={login}
                                        className="bg-primary/90 hover:bg-primary w-full py-3 rounded-[8px] text-white font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:scale-[1.02] active:scale-95"
                                    >
                                        <IoWalletSharp className="w-5 h-5" />
                                        <span>Connect Wallet</span>
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="text-center">No giveaway found</div>
                    )}
                </div>
            </section>
        </Layout>
    );
}