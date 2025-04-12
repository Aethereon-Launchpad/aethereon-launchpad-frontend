import BondFactoryABI from "../../abis/BondFactory.json";
import ERC20ABI from "../../abis/ERC20.json";
import Bond from "../../abis/Bond.json";
import { publicClient as client } from "../../config"
import { ethers } from 'ethers';
import { getContractAddress } from '../source';
import { ensureRawGistURL } from "../tools";

// Define the contract read configurations for common fields
const commonReadConfig = (bond: `0x${string}`, functionName: string) => ({
    address: bond,
    abi: Bond,
    functionName
})

export const getAllBondAddress = async () => {
    const bondFactoryAddress = getContractAddress("bondFactory")
    try {
        let addressList: `0x${string}`[] = []
        let index = 0

        while (true) {
            try {
                const address: any = await client.readContract({
                    address: bondFactoryAddress,
                    abi: BondFactoryABI,
                    functionName: "allBonds",
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
                break
            }
        }

        return addressList
    } catch (error) {
        console.error(error);
        throw new Error("Failed to retrieve bond addresses")
    }
}

export const getAllBondData = async () => {
    const allBonds = await getAllBondAddress();

    const bondData = await Promise.all(allBonds.map(async (bond: `0x${string}`) => {
        const bondContract = {
            address: bond,
            abi: Bond
        }
        const results = await client.multicall({
            contracts: [
                {
                    ...bondContract,
                    functionName: "metadataURI"
                },
                {
                    ...bondContract,
                    functionName: "paymentToken"
                },
                {
                    ...bondContract,
                    functionName: "saleToken"
                },
                {
                    ...bondContract,
                    functionName: "bondType"
                },
                {
                    ...bondContract,
                    functionName: "bondSize"
                },
                {
                    ...bondContract,
                    functionName: "totalSold"
                },
                {
                    ...bondContract,
                    functionName: "whitelistStartTime"
                },
                {
                    ...bondContract,
                    functionName: "saleStartTime"
                },
                {
                    ...bondContract,
                    functionName: "saleEndTime"
                },
                {
                    ...bondContract,
                    functionName: "withdrawTime"
                },
                {
                    ...bondContract,
                    functionName: "withdrawDelay"
                },
                {
                    ...bondContract,
                    functionName: "linearVestingEndTime"
                },
                {
                    ...bondContract,
                    functionName: "taxCollector"
                },
                {
                    ...bondContract,
                    functionName: "taxPercentage"
                },
                {
                    ...bondContract,
                    functionName: "isPrivateBond"
                },
                {
                    ...bondContract,
                    functionName: "stakingPool"
                },
                {
                    ...bondContract,
                    functionName: "fixedDiscountPercentage"
                },
                {
                    ...bondContract,
                    functionName: "getDiscount"
                },
                {
                    ...bondContract,
                    functionName: "initialDiscountPercentage"
                },
                {
                    ...bondContract,
                    functionName: "finalDiscountPercentage"
                },
                {
                    ...bondContract,
                    functionName: "whitelistCount"
                },
                {
                    ...bondContract,
                    functionName: "participants"
                },
                {
                    ...bondContract,
                    functionName: "bondAllocation"
                }
            ]
        });

        const [
            metadataURI,
            paymentToken,
            saleToken,
            bondType,
            bondSize,
            totalSold,
            whitelistStartTime,
            saleStartTime,
            saleEndTime,
            withdrawTime,
            withdrawDelay,
            linearVestingEndTime,
            taxCollector,
            taxPercentage,
            isPrivateBond,
            stakingPool,
            fixedDiscountPercentage,
            currentDiscount,
            initialDiscountPercentage,
            finalDiscountPercentage,
            whitelistCount,
            participants,
            bondAllocation
        ] = results;

        if (!paymentToken.result) throw new Error('Invalid payment token address');

        const paymentTokenData = await client.multicall({
            contracts: [
                {
                    address: paymentToken.result as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: "name"
                },
                {
                    address: paymentToken.result as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: "symbol"
                },
                {
                    address: paymentToken.result as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: "decimals"
                }
            ]
        })

        if (!paymentTokenData) throw new Error('Failed to retrieve payment token data');

        const [
            paymentTokenName,
            paymentTokenSymbol,
            paymentTokenDecimals
        ] = paymentTokenData;

        const saleTokenData = await client.multicall({
            contracts: [
                {
                    address: saleToken.result as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: "name"
                },
                {
                    address: saleToken.result as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: "symbol"
                },
                {
                    address: saleToken.result as `0x${string}`,
                    abi: ERC20ABI,
                    functionName: "decimals"
                }
            ]
        });

        if (!saleTokenData) throw new Error('Failed to retrieve sale token data');

        const [
            saleTokenName,
            saleTokenSymbol,
            saleTokenDecimals
        ] = saleTokenData;

        interface CliffVesting {
            claimTime: number,
            percentage: number
        }

        async function generateCliffPeriod() {
            let index = 0;
            let cliffPeriod: CliffVesting[] = []
            while (true) {
                try {
                    const currentPeriod: any = await client.readContract({
                        address: bond,
                        abi: Bond,
                        functionName: 'cliffPeriod',
                        args: [
                            index
                        ]
                    })

                    if (currentPeriod) {
                        cliffPeriod.push({
                            claimTime: Number(currentPeriod.claimTime || currentPeriod["0"]),
                            percentage: Number(currentPeriod.percentage || currentPeriod["1"])
                        })
                        index++;
                    } else {
                        break
                    }
                } catch (error) {
                    break
                }
            }

            return cliffPeriod;
        }

        const cliffPeriod = await generateCliffPeriod();

        return {
            id: bond,
            metadataURI: metadataURI.result,
            paymentToken: {
                id: paymentToken.result,
                name: paymentTokenName.result,
                symbol: paymentTokenSymbol.result,
                decimals: paymentTokenDecimals.result
            },
            saleToken: {
                id: saleToken.result,
                name: saleTokenName.result,
                symbol: saleTokenSymbol.result,
                decimals: saleTokenDecimals.result
            },
            bondType: Number(bondType.result),
            bondSize: ethers.formatUnits(bondSize.result as any, saleTokenDecimals.result as number),
            totalSold: ethers.formatUnits(totalSold.result as any, saleTokenDecimals.result as number),
            whitelistStartTime: Number(whitelistStartTime.result),
            saleStartTime: Number(saleStartTime.result),
            saleEndTime: Number(saleEndTime.result),
            withdrawTime: Number(withdrawTime.result),
            withdrawDelay: Number(withdrawDelay.result),
            linearVestingEndTime: Number(linearVestingEndTime.result),
            cliffPeriod: cliffPeriod,
            taxCollector: taxCollector.result,
            taxPercentage: Number(taxPercentage.result) / 100,
            isPrivateBond: isPrivateBond.result,
            stakingPool: stakingPool.result,
            fixedDiscountPercentage: Number(fixedDiscountPercentage.result) / 100,
            currentDiscount: Number(currentDiscount.result) / 100,
            initialDiscountPercentage: Number(initialDiscountPercentage.result) / 100,
            finalDiscountPercentage: Number(finalDiscountPercentage.result) / 100,
            whitelistCount: Number(whitelistCount.result),
            participants: Number(participants.result),
            bondAllocation: ethers.formatUnits(bondAllocation.result as any, saleTokenDecimals.result as number)
        };
    }));

    return bondData;
}

export const getBondDataByAddress = async (bond: `0x${string}`) => {
    const bondContract = {
        address: bond,
        abi: Bond
    }

    const results = await client.multicall({
        contracts: [
            {
                ...bondContract,
                functionName: "metadataURI"
            },
            {
                ...bondContract,
                functionName: "paymentToken"
            },
            {
                ...bondContract,
                functionName: "saleToken"
            },
            {
                ...bondContract,
                functionName: "bondType"
            },
            {
                ...bondContract,
                functionName: "bondSize"
            },
            {
                ...bondContract,
                functionName: "totalSold"
            },
            {
                ...bondContract,
                functionName: "whitelistStartTime"
            },
            {
                ...bondContract,
                functionName: "saleStartTime"
            },
            {
                ...bondContract,
                functionName: "saleEndTime"
            },
            {
                ...bondContract,
                functionName: "withdrawTime"
            },
            {
                ...bondContract,
                functionName: "withdrawDelay"
            },
            {
                ...bondContract,
                functionName: "linearVestingEndTime"
            },
            {
                ...bondContract,
                functionName: "taxCollector"
            },
            {
                ...bondContract,
                functionName: "taxPercentage"
            },
            {
                ...bondContract,
                functionName: "isPrivateBond"
            },
            {
                ...bondContract,
                functionName: "stakingPool"
            },
            {
                ...bondContract,
                functionName: "fixedDiscountPercentage"
            },
            {
                ...bondContract,
                functionName: "getDiscount"
            },
            {
                ...bondContract,
                functionName: "initialDiscountPercentage"
            },
            {
                ...bondContract,
                functionName: "finalDiscountPercentage"
            },
            {
                ...bondContract,
                functionName: "whitelistCount"
            },
            {
                ...bondContract,
                functionName: "participants"
            },
            {
                ...bondContract,
                functionName: "bondAllocation"
            }
        ]
    });

    const [
        metadataURI,
        paymentToken,
        saleToken,
        bondType,
        bondSize,
        totalSold,
        whitelistStartTime,
        saleStartTime,
        saleEndTime,
        withdrawTime,
        withdrawDelay,
        linearVestingEndTime,
        taxCollector,
        taxPercentage,
        isPrivateBond,
        stakingPool,
        fixedDiscountPercentage,
        currentDiscount,
        initialDiscountPercentage,
        finalDiscountPercentage,
        whitelistCount,
        participants,
        bondAllocation
    ] = results;

    if (!paymentToken.result) throw new Error('Invalid payment token address');

    const paymentTokenData = await client.multicall({
        contracts: [
            {
                address: paymentToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "name"
            },
            {
                address: paymentToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "symbol"
            },
            {
                address: paymentToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "decimals"
            }
        ]
    });

    if (!paymentTokenData) throw new Error('Failed to retrieve payment token data');

    const [
        paymentTokenName,
        paymentTokenSymbol,
        paymentTokenDecimals
    ] = paymentTokenData;

    const saleTokenData = await client.multicall({
        contracts: [
            {
                address: saleToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "name"
            },
            {
                address: saleToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "symbol"
            },
            {
                address: saleToken.result as `0x${string}`,
                abi: ERC20ABI,
                functionName: "decimals"
            }
        ]
    });

    if (!saleTokenData) throw new Error('Failed to retrieve sale token data');

    const [
        saleTokenName,
        saleTokenSymbol,
        saleTokenDecimals
    ] = saleTokenData;

    interface CliffVesting {
        claimTime: number;
        percentage: number;
    }

    async function generateCliffPeriod() {
        let index = 0;
        let cliffPeriod: CliffVesting[] = []
        while (true) {
            try {
                const currentPeriod: any = await client.readContract({
                    address: bond,
                    abi: Bond,
                    functionName: 'cliffPeriod',
                    args: [
                        index
                    ]
                })

                if (currentPeriod) {
                    cliffPeriod.push({
                        claimTime: Number(currentPeriod.claimTime || currentPeriod["0"]),
                        percentage: Number(currentPeriod.percentage || currentPeriod["1"])
                    })
                    index++;
                } else {
                    break
                }
            } catch (error) {
                break
            }
        }

        return cliffPeriod;
    }

    const cliffPeriod = await generateCliffPeriod();

    interface StakingTier {
        threshold: string;
        multiplier: number;
    }

    async function getStakingTiers() {
        let index = 0;
        let stakingTiers: StakingTier[] = [];

        while (true) {
            try {
                const tier: any = await client.readContract({
                    address: bond,
                    abi: Bond,
                    functionName: 'stakingTiers',
                    args: [index]
                });

                if (tier) {
                    stakingTiers.push({
                        threshold: ethers.formatUnits(tier.threshold || tier["0"], 18),
                        multiplier: Number(tier.multiplier || tier["1"]) / 10000 // Convert basis points to multiplier
                    });
                    index++;
                } else {
                    break;
                }
            } catch (error) {
                break;
            }
        }

        return stakingTiers;
    }

    const stakingTiers = await getStakingTiers();

    return {
        id: bond,
        metadataURI: metadataURI.result,
        paymentToken: {
            id: paymentToken.result,
            name: paymentTokenName.result,
            symbol: paymentTokenSymbol.result,
            decimals: paymentTokenDecimals.result
        },
        saleToken: {
            id: saleToken.result,
            name: saleTokenName.result,
            symbol: saleTokenSymbol.result,
            decimals: saleTokenDecimals.result
        },
        bondType: Number(bondType.result),
        bondSize: ethers.formatUnits(bondSize.result as any, saleTokenDecimals.result as number),
        totalSold: ethers.formatUnits(totalSold.result as any, saleTokenDecimals.result as number),
        whitelistStartTime: Number(whitelistStartTime.result),
        saleStartTime: Number(saleStartTime.result),
        saleEndTime: Number(saleEndTime.result),
        withdrawTime: Number(withdrawTime.result),
        withdrawDelay: Number(withdrawDelay.result),
        linearVestingEndTime: Number(linearVestingEndTime.result),
        cliffPeriod: cliffPeriod,
        stakingTiers: stakingTiers,
        taxCollector: taxCollector.result,
        taxPercentage: Number(taxPercentage.result) / 100,
        isPrivateBond: isPrivateBond.result,
        stakingPool: stakingPool.result,
        fixedDiscountPercentage: Number(fixedDiscountPercentage.result) / 100,
        currentDiscount: Number(currentDiscount.result) / 100,
        initialDiscountPercentage: Number(initialDiscountPercentage.result) / 100,
        finalDiscountPercentage: Number(finalDiscountPercentage.result) / 100,
        whitelistCount: Number(whitelistCount.result),
        participants: Number(participants.result),
        bondAllocation: ethers.formatUnits(bondAllocation.result as any, saleTokenDecimals.result as number)
    };
}

export const getAmountPaid = async (bond: `0x${string}`, walletAddress: `0x${string}`) => {
    try {
        const amountPaid = await client.readContract({
            address: bond,
            abi: Bond,
            functionName: "amountPaid",
            args: [
                walletAddress
            ]
        })

        const paymentToken = await client.readContract({
            address: bond,
            abi: Bond,
            functionName: "paymentToken"
        });

        const decimals = await client.readContract({
            address: paymentToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        });

        return Number(ethers.formatUnits(amountPaid as string, decimals as number));
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Failed to retrieve amount paid");
    }
}

export const getClaimableTokensAmount = async (bond: `0x${string}`, walletAddress: `0x${string}`) => {
    try {
        const claimableAmount = await client.readContract({
            address: bond,
            abi: Bond,
            functionName: "getCurrentClaimableToken",
            args: [
                walletAddress
            ]
        })

        const saleToken = await client.readContract({
            address: bond,
            abi: Bond,
            functionName: "saleToken"
        });

        const decimals = await client.readContract({
            address: saleToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        });

        return Number(ethers.formatUnits(claimableAmount as string, decimals as number));
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Failed to retrieve claimable amount");
    }
}

export const isUserWhitelisted = async (bond: `0x${string}`, walletAddress: `0x${string}`) => {
    try {
        const isWhitelisted = await client.readContract({
            address: bond,
            abi: Bond,
            functionName: "isWhitelisted",
            args: [
                walletAddress
            ]
        });

        return Boolean(isWhitelisted);
    } catch (error: any) {
        console.error(error.message);
        throw new Error("Failed to check whitelist status");
    }
}

export const getBondDataByProjectName = async (projectName: string) => {
    const allBonds = await getAllBondData();

    // Find the bond where the project name matches (case insensitive)
    const matchingBond = await Promise.all(allBonds.map(async (bond) => {
        if (!bond.metadataURI) return null;
        try {
            const response = await fetch(ensureRawGistURL(bond.metadataURI.toString()));
            if (!response.ok) return null;

            const metadata = await response.json() as { projectName?: string };
            if (metadata.projectName?.toLowerCase() === projectName.toLowerCase()) {
                return {
                    ...bond,
                    bondInfo: metadata
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching metadata:', error);
            return null;
        }
    }));

    // Filter out null values and return the first match
    const result = matchingBond.filter(p => p !== null);
    return result.length > 0 ? result[0] : null;
} 