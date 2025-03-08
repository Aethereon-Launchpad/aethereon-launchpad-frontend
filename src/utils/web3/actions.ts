import stakingPoolActionsABI from "../../abis/StakingPoolActions.json"
import stakingPoolABI from "../../abis/StakingPool.json"
import votingSlotFactory from "../../abis/VotingSlotFactory.json";
import votingSlotABI from "../../abis/VotingSlot.json";
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
            address: "0x1446a9B64137B63e952e8860bf70142EB314E7bc",
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

export const calculateStakeRewards = async (CA: `0x${string}`, userAddress: `0x${string}`) => {
    try {
        // Get Reward Token
        const rewardTokenAddress = await client.readContract({
            address: CA,
            abi: stakingPoolABI,
            functionName: "token1"
        })

        if (!rewardTokenAddress) {
            throw new Error("failed to retrieve reward token address")
        }
        // Get Token Decimals
        const decimals = await client.readContract({
            address: rewardTokenAddress as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        })

        // Get Rewards
        const calculatedRewards = await client.readContract({
            address: CA,
            abi: stakingPoolABI,
            functionName: "staked",
            args: [userAddress]
        })

        return ethers.formatUnits(calculatedRewards as string, decimals as number);
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve stake rewards")
    }
}

export const getStakingPoolRewardsAmount = async (stakingPoolAddress: `0x${string}`, userAddress: `0x${string}`) => {
    try {
        const rewards = await client.readContract({
            address: stakingPoolAddress,
            abi: stakingPoolABI,
            functionName: "calculateReward",
            args: [userAddress]
        })

        const token1 = await client.readContract({
            address: stakingPoolAddress,
            abi: stakingPoolABI,
            functionName: "token1"
        })

        // Get Token Decimals
        const decimals = await client.readContract({
            address: token1 as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        })

        return ethers.formatUnits(rewards as string, decimals as number);
    } catch (error) {
        console.error(error);
        throw new Error("failed to retrieve rewards amount")
    }
}



export const getNextRewardWithdrawTime = async (stakingPoolAddress: `0x${string}`, userAddress: `0x${string}`) => {
    try {
        const nextRewardTime = await client.readContract({
            address: stakingPoolAddress,
            abi: stakingPoolABI,
            functionName: "getNextWithdrawalTime",
            args: [userAddress]
        })

        return nextRewardTime as number
    } catch (error: any) {
        console.error(error);
        throw new Error("Failed to retrieve next reward time")
    }
}

export const getLastStakeTime = async (stakingPoolAddress: `0x${string}`, userAddress: `0x${string}`) => {
    try {
        const lastStakeTime = await client.readContract({
            address: stakingPoolAddress,
            abi: stakingPoolABI,
            functionName: "lastStakeTime",
            args: [userAddress]
        })

        return lastStakeTime as number
    } catch (error: any) {
        console.error(error);
        throw new Error("Failed to retrieve next reward time")
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

export const getStakingPower = async (pools: [{ id: `0x${string}` }], userAddress: `0x${string}`) => {
    try {
        let totalAmountStaked = 0;

        for (var i = 0; i < pools.length; i++) {
            const staked = await getAmountStaked(pools[i].id, userAddress);
            totalAmountStaked += Number(staked);
        }

        return totalAmountStaked;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to calculate total staking power")
    }
}

export const getTotalRewards = async (pools: [{ id: `0x${string}` }], userAddress: `0x${string}`) => {
    try {
        let totalRewards = 0;

        for (var i = 0; i < pools.length; i++) {
            const reward = await calculateStakeRewards(pools[i].id, userAddress);
            totalRewards += Number(reward);
        }

        return totalRewards;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to calculate total rewards")
    }
}

export const getParticipatedStakingPool = async (pools: [{ id: `0x${string}` }], userAddress: `0x${string}`) => {
    try {
        let stakedPools: any = [];

        for (var i = 0; i < pools.length; i++) {
            const staked = await getAmountStaked(pools[i].id, userAddress);
            if (Number(staked) > 0) {
                stakedPools.push(pools[i]);
            }
        }


        return stakedPools;
    } catch (error) {
        console.error(error);

        throw new Error("get participated pools")
    }
}


// Get Voting Pool Addresses
export const getAllVotingPoolAddresses = async () => {
    // Testnet Voting Factory
    const votingPoolFactory = '0xDEb50f80349B5159D058e666134E611C99006b3a'
    try {
        let addressList: `0x${string}`[] = []
        let index = 0

        while (true) {
            try {
                const address: any = await client.readContract({
                    address: votingPoolFactory,
                    abi: votingSlotFactory,
                    functionName: "allSlots",
                    args: [index]
                })

                // If we get a valid address, add it to the list
                if (address) {
                    addressList.push(address)
                    index++
                } else {
                    // If we get a null/undefined address, stop
                    break
                }
            } catch (error) {
                // If we get an error, stop the loop
                break
            }
        }

        return addressList
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve created voting pools")
    }
}


export const getVotingSlotData = async () => {
    const allSlots = await getAllVotingPoolAddresses();
    const votingSlotData = await Promise.all(allSlots.map(async (slot) => {
        const [
            name,
            image,
            description,
            voteStartDate,
            voteEndDate,
            negativeVoteWeight,
            positiveVoteWeight
        ] = await Promise.all([
            client.readContract({
                address: slot,
                abi: votingSlotABI,
                functionName: "name"
            }),
            client.readContract({
                address: slot,
                abi: votingSlotABI,
                functionName: "image"
            }),
            client.readContract({
                address: slot,
                abi: votingSlotABI,
                functionName: "description"
            }),
            client.readContract({
                address: slot,
                abi: votingSlotABI,
                functionName: "voteStartDate"
            }),
            client.readContract({
                address: slot,
                abi: votingSlotABI,
                functionName: "voteEndDate"
            }),
            client.readContract({
                address: slot,
                abi: votingSlotABI,
                functionName: "negativeVoteWeight"
            }),
            client.readContract({
                address: slot,
                abi: votingSlotABI,
                functionName: "positiveVoteWeight"
            })
        ]);

        return {
            id: slot,
            contractAddress: slot,
            name,
            image,
            description,
            voteStartDate: Number(voteStartDate?.toString() || '0'),
            voteEndDate: Number(voteEndDate?.toString() || '0'),
            negativeVoteWeight: Number(negativeVoteWeight?.toString() || '0'),
            positiveVoteWeight: Number(positiveVoteWeight?.toString() || '0')
        }
    }));
    console.log(allSlots);
    return votingSlotData;
}

export const getVotingSlotByID = async (votingSlotAddress: `0x${string}`) => {
    try {
        const [
            name,
            image,
            description,
            voteStartDate,
            voteEndDate,
            negativeVoteWeight,
            positiveVoteWeight
        ] = await Promise.all([
            client.readContract({
                address: votingSlotAddress,
                abi: votingSlotABI,
                functionName: "name"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: votingSlotABI,
                functionName: "image"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: votingSlotABI,
                functionName: "description"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: votingSlotABI,
                functionName: "voteStartDate"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: votingSlotABI,
                functionName: "voteEndDate"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: votingSlotABI,
                functionName: "negativeVoteWeight"
            }),
            client.readContract({
                address: votingSlotAddress,
                abi: votingSlotABI,
                functionName: "positiveVoteWeight"
            })
        ]);

        return {
            id: votingSlotAddress,
            contractAddress: votingSlotAddress,
            name,
            image,
            description,
            voteStartDate: Number(voteStartDate?.toString() || '0'),
            voteEndDate: Number(voteEndDate?.toString() || '0'),
            negativeVoteWeight: Number(negativeVoteWeight?.toString() || '0'),
            positiveVoteWeight: Number(positiveVoteWeight?.toString() || '0')
        }
    } catch (error) {
        console.error(error)
        throw new Error("failed to retrieve voting slot data")
    }
}

export const getAllStakingPoolAddress = async () => {
    const stakingPoolFactory = "0x1446a9B64137B63e952e8860bf70142EB314E7bc"

    try {
        let addressList: `0x${string}`[] = []
        let index = 0

        while (true) {
            try {
                const address: any = await client.readContract({
                    address: stakingPoolFactory,
                    abi: stakingPoolActionsABI,
                    functionName: "allPools",
                    args: [index]
                })

                // If we get a valid address, add it to the list
                if (address) {
                    addressList.push(address)
                    index++
                } else {
                    // If we get a null/undefined address, stop
                    break
                }
            } catch (error) {
                // If we get an error, stop the loop
                break
            }
        }

        return addressList
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve created staking pools")
    }
}


export const getAllStakingPoolData = async () => {
    const allPools = await getAllStakingPoolAddress();

    const stakingPoolData = await Promise.all(allPools.map(async (pool: `0x${string}`) => {
        const [apyRate, withdrawalIntervals, stakeFeePercentage, withdrawalFeePercentage, stakeToken, rewardToken] = await Promise.all([
            client.readContract({
                address: pool,
                abi: stakingPoolABI,
                functionName: "apyRate"
            }),
            client.readContract({
                address: pool,
                abi: stakingPoolABI,
                functionName: "withdrawalIntervals"
            }),
            client.readContract({
                address: pool,
                abi: stakingPoolABI,
                functionName: "stakeFeePercentage"
            }),
            client.readContract({
                address: pool,
                abi: stakingPoolABI,
                functionName: "withdrawalFeePercentage"
            }),
            client.readContract({
                address: pool,
                abi: stakingPoolABI,
                functionName: "token0"
            }),
            client.readContract({
                address: pool,
                abi: stakingPoolABI,
                functionName: "token1"
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
            id: pool,
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
            }
        }
    }))

    return stakingPoolData;
}

export const getStakingPoolDataByAddress = async (stakingPool: `0x${string}`) => {
    const [apyRate, withdrawalIntervals, stakeFeePercentage, withdrawalFeePercentage, stakeToken, rewardToken] = await Promise.all([
        client.readContract({
            address: stakingPool,
            abi: stakingPoolABI,
            functionName: "apyRate"
        }),
        client.readContract({
            address: stakingPool,
            abi: stakingPoolABI,
            functionName: "withdrawalIntervals"
        }),
        client.readContract({
            address: stakingPool,
            abi: stakingPoolABI,
            functionName: "stakeFeePercentage"
        }),
        client.readContract({
            address: stakingPool,
            abi: stakingPoolABI,
            functionName: "withdrawalFeePercentage"
        }),
        client.readContract({
            address: stakingPool,
            abi: stakingPoolABI,
            functionName: "token0"
        }),
        client.readContract({
            address: stakingPool,
            abi: stakingPoolABI,
            functionName: "token1"
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
        stakingPool: {
            id: stakingPool,
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
            }
        }
    }
}