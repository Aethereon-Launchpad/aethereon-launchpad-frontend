import stakingPoolActionsABI from "../../abis/StakingPoolActions.json"
import stakingPoolABI from "../../abis/StakingPool.json"
import votingSlotFactory from "../../abis/VotingSlotFactory.json";
import votingSlot from "../../abis/VotingSlot.json";
import PresaleFactory from "../../abis/PresaleFactory.json";
import Presale from "../../abis/Presale.json";
import ERC20ABI from "../../abis/ERC20.json";
import { publicClient as client } from "../../config"
import { ethers } from 'ethers';

export const isValidERC20 = async (tokenAddress: `0x${string}`) => {
    try {
        const supply = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: 'totalSupply'
        });

        if (supply === undefined) {
            throw new Error("Invalid token address");
        }
        return true;
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Invalid ERC20 token");
    }
}

export const getTokenSymbol = async (tokenAddress: `0x${string}`) => {
    try {
        const symbol = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: "symbol"
        })

        return symbol;
    } catch (error: any) {
        console.error(error.message)
        throw new Error("Invalid ERC20 token");
    }
}

export const getTokenDecimals = async (tokenAddress: `0x${string}`) => {
    try {
        const decimals = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: "decimals"
        })

        return decimals as number;
    } catch (error: any) {
        console.error(error.message)
        throw new Error("Invalid ERC20 token");
    }
}

export const getTokenBalance = async (tokenAddress: `0x${string}`, userAddress: `0x${string}` | any) => {
    try {
        const balance = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: "balanceOf",
            args: [userAddress]
        })

        const decimals = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: "decimals"
        })
        const formattedBalance = ethers.formatUnits(balance as string, decimals as number);
        return new Intl.NumberFormat('en-US', { minimumFractionDigits: 5, maximumFractionDigits: 5 }).format(Number(formattedBalance)) || 0;
    } catch (error: any) {
        console.error(error.message)
        throw new Error("Invalid ERC20 token");
    }
}

export const getTokenAllowance = async (tokenAddress: `0x${string}`, spenderAddress: `0x${string}`, userWallet: `0x${string}`) => {
    try {
        const allowance = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: "allowance",
            args: [
                userWallet,
                spenderAddress
            ]
        })

        const decimals = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: "decimals"
        })


        return ethers.formatUnits(allowance as string, decimals as number);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retreive allowance")
    }
}

export const getTotalSupply = async (tokenAddress: `0x${string}`) => {
    try {
        const totalSupply = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: "totalSupply"
        })

        const decimals = await client.readContract({
            address: tokenAddress,
            abi: ERC20ABI,
            functionName: "decimals"
        })

        return ethers.formatUnits(totalSupply as string, decimals as number);
    } catch (error) {
        console.error(error)
        throw new Error("Failed to retrieve total supply")
    }
}

export const getStakingPoolFactoryFee = async () => {
    try {
        const fee = await client.readContract({
            address: "0x0D8206c67D60bDE91093bB254E4Fc15f39B9dd3e",
            abi: stakingPoolActionsABI,
            functionName: "fee"
        })

        return fee as string;
    } catch (error: any) {
        console.error(error.message)
        throw new Error("Invalid Staking Pool Factory ");
    }
}

export const getAmountStaked = async (CA: `0x${string}`, userAddress: `0x${string}`) => {
    try {
        // Get Stake Token
        const stakeTokenAddress = await client.readContract({
            address: CA,
            abi: stakingPoolABI,
            functionName: "token0"
        })

        if (!stakeTokenAddress) {
            throw new Error("failed to retrieve stake token address")
        }

        // Get Token Decimals
        const decimals = await client.readContract({
            address: stakeTokenAddress as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        })

        // Get Amount Staked
        const amountStaked = await client.readContract({
            address: CA,
            abi: stakingPoolABI,
            functionName: "staked",
            args: [userAddress]
        })

        return ethers.formatUnits(amountStaked as string, decimals as number);
    } catch (error: any) {
        console.error(error);
        throw new Error("failed to retrieve stake amount")
    }
}

export const getStakingPoolPauseStatus = async (CA: `0x${string}`) => {
    try {
        const pauseStatus = await client.readContract({
            address: CA,
            abi: stakingPoolABI,
            functionName: "paused"
        })

        return pauseStatus as boolean;
    } catch (error: any) {
        console.error(error);
        throw new Error("Failed to get staking pool paused state")
    }
}

export const getStakingPoolOwner = async (CA: `0x${string}`) => {
    try {
        const owner = await client.readContract({
            address: CA,
            abi: stakingPoolABI,
            functionName: "owner"
        })

        return owner as string;
    } catch (error: any) {
        console.error(error);
        throw new Error("Failed to get staking pool paused state")
    }
}



export const getNextRewardTime = async (CA: `0x${string}`, userAddress: `0x${string}`) => {
    try {

    } catch (error: any) {

    }
}