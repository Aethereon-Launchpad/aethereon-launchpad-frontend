import PresaleFactoryABI from "../../abis/PresaleFactory.json";
import ERC20ABI from "../../abis/ERC20.json";
import Presale from "../../abis/Presale.json";
import { publicClient as client } from "../../config"
import { ethers } from 'ethers';
import { getContractAddress } from '../source';

// Define the contract read configurations for common fields
const commonReadConfig = (presale: `0x${string}`, functionName: string) => ({
    address: presale,
    abi: Presale,
    functionName
})

export const getAllPresaleAddress = async () => {
    const presaleFactoryAddress = getContractAddress("presaleFactory")
    try {
        let addressList: `0x${string}`[] = []
        let index = 0

        while (true) {
            try {
                const address: any = await client.readContract({
                    address: presaleFactoryAddress,
                    abi: PresaleFactoryABI,
                    functionName: "allPresales",
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
        throw new Error("Failed to retrieve created staking pools")
    }

}

export const getAllPresaleData = async () => {
    const allPresales = await getAllPresaleAddress();

    const presaleData = await Promise.all(allPresales.map(async (presale: `0x${string}`) => {
        const presaleContract = {
            address: presale,
            abi: Presale
        }
        const results = await client.multicall({
            contracts: [
                {
                    ...presaleContract,
                    functionName: "metadataURI"
                },
                {
                    ...presaleContract,
                    functionName: "paymentToken"
                },
                {
                    ...presaleContract,
                    functionName: "saleToken"
                },
                {
                    ...presaleContract,
                    functionName: "salePrice"
                },
                {
                    ...presaleContract,
                    functionName: "startTime"
                },
                {
                    ...presaleContract,
                    functionName: "endTime"
                },
                {
                    ...presaleContract,
                    functionName: "minTotalPayment"
                },
                {
                    ...presaleContract,
                    functionName: "maxTotalPayment"
                },
                {
                    ...presaleContract,
                    functionName: "softCap"
                },
                {
                    ...presaleContract,
                    functionName: "hardCap"
                },
                {
                    ...presaleContract,
                    functionName: "totalPaymentReceived"
                },
                {
                    ...presaleContract,
                    functionName: "purchaserCount"
                },
                {
                    ...presaleContract,
                    functionName: "isSoftCapReached"
                },
                {
                    ...presaleContract,
                    functionName: "hasCashed"
                },
                {
                    ...presaleContract,
                    functionName: "withdrawerCount"
                },
                {
                    ...presaleContract,
                    functionName: "withdrawDelay"
                },
                {
                    ...presaleContract,
                    functionName: "linearVestingEndTime"
                },
                {
                    ...presaleContract,
                    functionName: "taxCollector"
                },
                {
                    ...presaleContract,
                    functionName: "taxPercentage"
                },
                {
                    ...presaleContract,
                    functionName: "stakingPool"
                },
                {
                    ...presaleContract,
                    functionName: "isPrivateSale"
                }
            ]
        });

        const [
            metadataURI,
            paymentToken,
            saleToken,
            salePrice,
            startTime,
            endTime,
            minTotalPayment,
            maxTotalPayment,
            softCap,
            hardCap,
            totalPaymentReceived,
            purchaserCount,
            isSoftCapReached,
            hasCashed,
            withdrawerCount,
            withdrawDelay,
            linearVestingEndTime,
            taxCollector,
            taxPercentage,
            stakingPool,
            isPrivateSale
        ] = results;

        if (!paymentToken) throw new Error('Invalid payment token address');

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
        })

        const [
            saleTokenName,
            saleTokenSymbol,
            saleTokenDecimals
        ] = saleTokenData;

        if (!saleTokenData) throw new Error('Failed to retrieve sale token data');


        return {
            id: presale,
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
            salePrice: ethers.formatUnits(salePrice.result as any, paymentTokenDecimals.result as number),
            startTime: Number(startTime.result),
            endTime: Number(endTime.result),
            minTotalPayment: ethers.formatUnits(minTotalPayment.result as any, paymentTokenDecimals.result as number),
            maxTotalPayment: ethers.formatUnits(maxTotalPayment.result as any, paymentTokenDecimals.result as number),
            softCap: ethers.formatUnits(softCap.result as any, paymentTokenDecimals.result as number),
            hardCap: ethers.formatUnits(hardCap.result as any, paymentTokenDecimals.result as number),
            totalPaymentReceived: ethers.formatUnits(totalPaymentReceived.result as any, paymentTokenDecimals.result as number),
            purchaserCount: Number(purchaserCount.result),
            isSoftCapReached: isSoftCapReached.result,
            hasCashed: hasCashed.result,
            withdrawerCount: withdrawerCount.result,
            withdrawDelay: withdrawDelay.result,
            linearVestingEndTime: Number(linearVestingEndTime.result),
            taxCollector: taxCollector.result,
            taxPercentage: Number(taxPercentage.result) / 100,
            stakingPool: stakingPool.result,
            isPrivateSale: isPrivateSale.result
        };
    }));

    return presaleData;
}

export const getPresaleDataByAddress = async (presale: `0x${string}`) => {
    const presaleContract = {
        address: presale,
        abi: Presale
    }

    const results = await client.multicall({
        contracts: [
            {
                ...presaleContract,
                functionName: "metadataURI"
            },
            {
                ...presaleContract,
                functionName: "paymentToken"
            },
            {
                ...presaleContract,
                functionName: "saleToken"
            },
            {
                ...presaleContract,
                functionName: "salePrice"
            },
            {
                ...presaleContract,
                functionName: "startTime"
            },
            {
                ...presaleContract,
                functionName: "endTime"
            },
            {
                ...presaleContract,
                functionName: "minTotalPayment"
            },
            {
                ...presaleContract,
                functionName: "maxTotalPayment"
            },
            {
                ...presaleContract,
                functionName: "softCap"
            },
            {
                ...presaleContract,
                functionName: "hardCap"
            },
            {
                ...presaleContract,
                functionName: "totalPaymentReceived"
            },
            {
                ...presaleContract,
                functionName: "purchaserCount"
            },
            {
                ...presaleContract,
                functionName: "isSoftCapReached"
            },
            {
                ...presaleContract,
                functionName: "hasCashed"
            },
            {
                ...presaleContract,
                functionName: "withdrawerCount"
            },
            {
                ...presaleContract,
                functionName: "withdrawDelay"
            },
            {
                ...presaleContract,
                functionName: "linearVestingEndTime"
            },
            {
                ...presaleContract,
                functionName: "taxCollector"
            },
            {
                ...presaleContract,
                functionName: "taxPercentage"
            },
            {
                ...presaleContract,
                functionName: "stakingPool"
            },
            {
                ...presaleContract,
                functionName: "isPrivateSale"
            }
        ]
    });


    const [
        metadataURI,
        paymentToken,
        saleToken,
        salePrice,
        startTime,
        endTime,
        minTotalPayment,
        maxTotalPayment,
        softCap,
        hardCap,
        totalPaymentReceived,
        purchaserCount,
        isSoftCapReached,
        hasCashed,
        withdrawerCount,
        withdrawDelay,
        linearVestingEndTime,
        taxCollector,
        taxPercentage,
        stakingPool,
        isPrivateSale
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

    interface Period {
        claimTime: number,
        pct: number
    }

    async function generateCliffPeriod() {
        let index = 0;
        let cliffPeriod: Period[] = []
        while (true) {
            try {
                const currentPeriod: any = await client.readContract({
                    address: presale,
                    abi: Presale,
                    functionName: 'cliffPeriod',
                    args: [
                        index
                    ]
                })

                if (currentPeriod) {
                    currentPeriod.claimTime = Number(currentPeriod["0"]);
                    currentPeriod.pct = Number(currentPeriod["1"]);
                    delete currentPeriod["0"];
                    delete currentPeriod["1"];
                    cliffPeriod.push(currentPeriod)
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
        id: presale,
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
        salePrice: ethers.formatUnits(salePrice.result as any, paymentTokenDecimals.result as number),
        startTime: Number(startTime.result),
        endTime: Number(endTime.result),
        minTotalPayment: ethers.formatUnits(minTotalPayment.result as any, paymentTokenDecimals.result as number),
        maxTotalPayment: ethers.formatUnits(maxTotalPayment.result as any, paymentTokenDecimals.result as number),
        softCap: ethers.formatUnits(softCap.result as any, paymentTokenDecimals.result as number),
        hardCap: ethers.formatUnits(hardCap.result as any, paymentTokenDecimals.result as number),
        totalPaymentReceived: ethers.formatUnits(totalPaymentReceived.result as any, paymentTokenDecimals.result as number),
        purchaserCount: Number(purchaserCount.result),
        isSoftCapReached: isSoftCapReached.result,
        hasCashed: hasCashed.result,
        withdrawerCount: withdrawerCount.result,
        withdrawDelay: withdrawDelay.result,
        linearVestingEndTime: Number(linearVestingEndTime.result),
        cliffPeriod: cliffPeriod,
        taxCollector: taxCollector.result,
        taxPercentage: Number(taxPercentage.result) / 100,
        stakingPool: stakingPool.result,
        isPrivateSale: isPrivateSale.result
    };
}

export const paymentMade = async (presale: `0x${string}`, walletAddress: `0x${string}`) => {
    try {
        const paymentReceived = await client.readContract({
            address: presale,
            abi: Presale,
            functionName: "paymentReceived",
            args: [
                walletAddress
            ]
        })

        return (Number(ethers.formatUnits(paymentReceived as string, 18)))
    } catch (error: any) {
        console.error(error.message)
        throw new Error("Failed to retrieve payment made");
    }
}

export const getClaimableTokensAmount = async (presale: `0x${string}`, walletAddress: `0x${string}`) => {
    try {
        const claimableAmount = await client.readContract({
            address: presale,
            abi: Presale,
            functionName: "getCurrentClaimableToken",
            args: [
                walletAddress
            ]
        })

        const saleToken = await client.readContract({
            address: presale,
            abi: Presale,
            functionName: "saleToken"
        })

        const decimals = await client.readContract({
            address: saleToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        })


        return (Number(ethers.formatUnits(claimableAmount as string, decimals as number)))
    } catch (error: any) {
        console.error(error.message)
        throw new Error("Failed to retrieve claimable amount");
    }
}

export const getPresaleDataByProjectName = async (projectName: string) => {
    const allPresales = await getAllPresaleData();

    // Find the presale where the project name matches (case insensitive)
    const matchingPresale = await Promise.all(allPresales.map(async (presale) => {
        if (!presale.metadataURI) return null;
        try {
            const response = await fetch(presale.metadataURI.toString());
            if (!response.ok) return null;

            const metadata = await response.json() as { projectName?: string };
            if (metadata.projectName?.toLowerCase() === projectName.toLowerCase()) {
                return {
                    ...presale,
                    presaleInfo: metadata
                };
            }
            return null;
        } catch (error) {
            console.error('Error fetching metadata:', error);
            return null;
        }
    }));

    // Filter out null values and return the first match
    const result = matchingPresale.filter(p => p !== null);
    return result.length > 0 ? result[0] : null;
}