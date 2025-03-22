import LockStakeABI from "../../abis/StakeLock.json";
import ERC20ABI from "../../abis/ERC20.json";
import { publicClient as client } from "../../config";
import { ethers } from "ethers";
import { getTotalSupply } from "./actions";
import { parseAbiItem } from "viem";

const stakeLock = "0xA694F36757a3C1A4b9bD335460E1D5F826a9a016"

export const getLockAndStake = async () => {
    const [apyRate, withdrawalIntervals, stakeFeePercentage, withdrawalFeePercentage, stakeToken, rewardToken, totalStaked, totalRewardable, feeReceiver] = await Promise.all([
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "apyRate"
        }),
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "withdrawalIntervals"
        }),
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "stakeFeePercentage"
        }),
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "withdrawalFeePercentage"
        }),
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "token0"
        }),
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "token1"
        }),
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "totalStaked"
        }),
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "totalRewardable"
        }),
        client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "feeReceiver"
        })
    ])

    const stakeTokenName = await client.readContract({
        address: stakeToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "name"
    })

    const stakeTokenSymbol = await client.readContract({
        address: stakeToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "symbol"
    })

    const stakeTokenDecimals = await client.readContract({
        address: stakeToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "decimals"
    })

    const rewardTokenName = await client.readContract({
        address: rewardToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "name"
    })

    const rewardTokenSymbol = await client.readContract({
        address: rewardToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "symbol"
    })

    const rewardTokenDecimals = await client.readContract({
        address: rewardToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "decimals"
    })

    return {
        stakeLock: {
            id: stakeLock,
            apyRate: Number(apyRate) / 1e4,
            withdrawalIntervals: Number(withdrawalIntervals),
            stakeFeePercentage: Number(stakeFeePercentage) * 100 / 1e4,
            withdrawalFeePercentage: Number(withdrawalFeePercentage) * 100 / 1e4,
            stakeToken: {
                id: stakeToken,
                name: stakeTokenName,
                symbol: stakeTokenSymbol,
                decimals: stakeTokenDecimals
            },
            rewardToken: {
                id: rewardToken,
                name: rewardTokenName,
                symbol: rewardTokenSymbol,
                decimals: rewardTokenDecimals
            },
            totalStaked: ethers.formatUnits(totalStaked as string, stakeTokenDecimals as number),
            totalRewardable: ethers.formatUnits(totalRewardable as string, rewardTokenDecimals as number),
            feeReceiver
        }
    }
}

export const getUserLockStakeData = async (userAddress: `0x${string}`) => {
    try {
        const [
            lastStakeTime,
            nextRewardTime,
            rewards,
            amountStaked,
            stakeTokenAddress,
            rewardTokenAddress
        ] = await Promise.all([
            client.readContract({
                address: stakeLock,
                abi: LockStakeABI,
                functionName: "lastStakeTime",
                args: [userAddress]
            }),
            client.readContract({
                address: stakeLock,
                abi: LockStakeABI,
                functionName: "getNextWithdrawalTime",
                args: [userAddress]
            }),
            client.readContract({
                address: stakeLock,
                abi: LockStakeABI,
                functionName: "calculateReward",
                args: [userAddress]
            }),
            client.readContract({
                address: stakeLock,
                abi: LockStakeABI,
                functionName: "staked",
                args: [userAddress]
            }),
            client.readContract({
                address: stakeLock,
                abi: LockStakeABI,
                functionName: "token0"
            }),
            client.readContract({
                address: stakeLock,
                abi: LockStakeABI,
                functionName: "token1"
            })
        ]);

        const [stakeTokenDecimals, rewardTokenDecimals] = await Promise.all([
            client.readContract({
                address: stakeTokenAddress as `0x${string}`,
                abi: ERC20ABI,
                functionName: "decimals"
            }),
            client.readContract({
                address: rewardTokenAddress as `0x${string}`,
                abi: ERC20ABI,
                functionName: "decimals"
            })
        ]);

        return {
            lastStakeTime: Number(lastStakeTime) as number,
            nextRewardTime: Number(nextRewardTime) as number,
            rewards: ethers.formatUnits(rewards as string, rewardTokenDecimals as number),
            amountStaked: ethers.formatUnits(amountStaked as string, stakeTokenDecimals as number)
        };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve user lock stake data");
    }
}

export const estimateRewards = async (stakeAmount: bigint) => {
    try {
        const rewardToken = await client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "token1"
        })

        const rewardTokenDecimals = await client.readContract({
            address: rewardToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        })

        const estimateRewards = await client.readContract({
            address: stakeLock,
            abi: LockStakeABI,
            functionName: "estimateRewards",
            args: [
                stakeAmount
            ]
        })

        return ethers.formatUnits(estimateRewards as string, rewardTokenDecimals as number)
    } catch (error: any) {
        console.error(error.message)
        throw new Error("Estimating Reward Failed")
    }
}
