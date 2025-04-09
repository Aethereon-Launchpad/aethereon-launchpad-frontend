import LockStakeABI from "../../abis/StakeLock.json";
import ERC20ABI from "../../abis/ERC20.json";
import { publicClient as client } from "../../config";
import { ethers } from "ethers";
import { getTotalSupply } from "./actions";
import { parseAbiItem } from "viem";
import { getContractAddress } from "../../utils/source";

const stakeLock = getContractAddress("stakeLock");

export const getLockAndStake = async () => {
    const stakeLockContract = {
        address: stakeLock,
        abi: LockStakeABI
    };

    const results = await client.multicall({
        contracts: [
            {
                ...stakeLockContract,
                functionName: "apyRate"
            },
            {
                ...stakeLockContract,
                functionName: "withdrawalIntervals"
            },
            {
                ...stakeLockContract,
                functionName: "stakeFeePercentage"
            },
            {
                ...stakeLockContract,
                functionName: "withdrawalFeePercentage"
            },
            {
                ...stakeLockContract,
                functionName: "token0"
            },
            {
                ...stakeLockContract,
                functionName: "token1"
            },
            {
                ...stakeLockContract,
                functionName: "totalStaked"
            },
            {
                ...stakeLockContract,
                functionName: "totalRewardable"
            },
            {
                ...stakeLockContract,
                functionName: "feeReceiver"
            }
        ]
    });

    const [
        apyRate,
        withdrawalIntervals,
        stakeFeePercentage,
        withdrawalFeePercentage,
        stakeToken,
        rewardToken,
        totalStaked,
        totalRewardable,
        feeReceiver
    ] = results;

    if (!stakeToken.result || !rewardToken.result) throw new Error('Invalid token addresses');

    const stakeTokenData = await client.multicall({
        contracts: [
            {
                address: stakeToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "name"
            },
            {
                address: stakeToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "symbol"
            },
            {
                address: stakeToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "decimals"
            }
        ]
    });

    const [stakeTokenName, stakeTokenSymbol, stakeTokenDecimals] = stakeTokenData;

    const rewardTokenData = await client.multicall({
        contracts: [
            {
                address: rewardToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "name"
            },
            {
                address: rewardToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "symbol"
            },
            {
                address: rewardToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "decimals"
            }
        ]
    });

    const [rewardTokenName, rewardTokenSymbol, rewardTokenDecimals] = rewardTokenData;

    return {
        stakeLock: {
            id: stakeLock,
            apyRate: Number(apyRate.result) / 1e4,
            withdrawalIntervals: Number(withdrawalIntervals.result),
            stakeFeePercentage: Number(stakeFeePercentage.result) * 100 / 1e4,
            withdrawalFeePercentage: Number(withdrawalFeePercentage.result) * 100 / 1e4,
            stakeToken: {
                id: stakeToken.result,
                name: stakeTokenName.result,
                symbol: stakeTokenSymbol.result,
                decimals: stakeTokenDecimals.result
            },
            rewardToken: {
                id: rewardToken.result,
                name: rewardTokenName.result,
                symbol: rewardTokenSymbol.result,
                decimals: rewardTokenDecimals.result
            },
            totalStaked: ethers.formatUnits(totalStaked.result as string, stakeTokenDecimals.result as number),
            totalRewardable: ethers.formatUnits(totalRewardable.result as string, rewardTokenDecimals.result as number),
            feeReceiver: feeReceiver.result
        }
    }
}

export const getUserLockStakeData = async (userAddress: `0x${string}`) => {
    try {
        const stakeLockContract = {
            address: stakeLock,
            abi: LockStakeABI
        };

        const results = await client.multicall({
            contracts: [
                {
                    ...stakeLockContract,
                    functionName: "lastStakeTime",
                    args: [userAddress]
                },
                {
                    ...stakeLockContract,
                    functionName: "getNextWithdrawalTime",
                    args: [userAddress]
                },
                {
                    ...stakeLockContract,
                    functionName: "calculateReward",
                    args: [userAddress]
                },
                {
                    ...stakeLockContract,
                    functionName: "staked",
                    args: [userAddress]
                },
                {
                    ...stakeLockContract,
                    functionName: "token0"
                },
                {
                    ...stakeLockContract,
                    functionName: "token1"
                }
            ]
        });

        const [
            lastStakeTime,
            nextRewardTime,
            rewards,
            amountStaked,
            stakeTokenAddress,
            rewardTokenAddress
        ] = results;

        if (!stakeTokenAddress.result || !rewardTokenAddress.result) {
            throw new Error('Invalid token addresses');
        }

        const tokenData = await client.multicall({
            contracts: [
                {
                    address: stakeTokenAddress.result as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: "decimals"
                },
                {
                    address: rewardTokenAddress.result as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: "decimals"
                }
            ]
        });

        const [stakeTokenDecimals, rewardTokenDecimals] = tokenData;

        return {
            lastStakeTime: Number(lastStakeTime.result),
            nextRewardTime: Number(nextRewardTime.result),
            rewards: ethers.formatUnits(rewards.result as string, rewardTokenDecimals.result as number),
            amountStaked: ethers.formatUnits(amountStaked.result as string, stakeTokenDecimals.result as number)
        };
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve user lock stake data");
    }
}

export const estimateRewards = async (stakeAmount: bigint) => {
    try {
        const stakeLockContract = {
            address: stakeLock,
            abi: LockStakeABI
        };

        const results = await client.multicall({
            contracts: [
                {
                    ...stakeLockContract,
                    functionName: "token1"
                },
                {
                    ...stakeLockContract,
                    functionName: "estimateRewards",
                    args: [stakeAmount]
                }
            ]
        });

        const [rewardToken, estimatedRewards] = results;

        if (!rewardToken.result) {
            throw new Error('Invalid reward token address');
        }

        const rewardTokenDecimals = await client.readContract({
            address: rewardToken.result as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        });

        return ethers.formatUnits(estimatedRewards.result as string, rewardTokenDecimals as number);
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Estimating Reward Failed");
    }
}
