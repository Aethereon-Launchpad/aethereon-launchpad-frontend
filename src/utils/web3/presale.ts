import PresaleFactoryABI from "../../abis/PresaleFactory.json";
import ERC20ABI from "../../abis/ERC20.json";
import Presale from "../../abis/Presale.json";
import { publicClient as client } from "../../config"
import { ethers } from 'ethers';

export const getAllPresaleAddress = async () => {
    const presaleFactoryAddress = `0x94BA86336A2e6740983B97df627d9d81bfED2949`
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
            withdrawDelay
        ] = await Promise.all([
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "metadataURI"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "paymentToken"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "saleToken"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "salePrice"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "startTime"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "endTime"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "minTotalPayment"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "maxTotalPayment"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "softCap"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "hardCap"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "totalPaymentReceived"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "purchaserCount"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "isSoftCapReached"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "hasCashed"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "withdrawerCount"
            }),
            client.readContract({
                address: presale,
                abi: Presale,
                functionName: "withdrawDelay"
            }),
        ]);

        const paymentTokenName = await client.readContract({
            address: paymentToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "name"
        });

        const paymentTokenSymbol = await client.readContract({
            address: paymentToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "symbol"
        });

        const paymentTokenDecimals = await client.readContract({
            address: paymentToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        });

        const saleTokenName = await client.readContract({
            address: saleToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "name"
        })

        const saleTokenSymbol = await client.readContract({
            address: saleToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "symbol"
        });

        const saleTokenDecimals = await client.readContract({
            address: saleToken as `0x${string}`,
            abi: ERC20ABI,
            functionName: "decimals"
        });


        return {
            id: presale,
            metadataURI,
            paymentToken: {
                id: paymentToken,
                name: paymentTokenName,
                symbol: paymentTokenSymbol,
                decimals: paymentTokenDecimals
            },
            saleToken: {
                id: saleToken,
                name: saleTokenName,
                symbol: saleTokenSymbol,
                decimals: saleTokenDecimals
            },
            salePrice: ethers.formatUnits(salePrice as string, paymentTokenDecimals as number),
            startTime: Number(startTime),
            endTime: Number(endTime),
            minTotalPayment: ethers.formatUnits(minTotalPayment as string, paymentTokenDecimals as number),
            maxTotalPayment: ethers.formatUnits(maxTotalPayment as string, paymentTokenDecimals as number),
            softCap: ethers.formatUnits(softCap as string, paymentTokenDecimals as number),
            hardCap: ethers.formatUnits(hardCap as string, paymentTokenDecimals as number),
            totalPaymentReceived: ethers.formatUnits(totalPaymentReceived as string, paymentTokenDecimals as number),
            purchaserCount: Number(purchaserCount),
            isSoftCapReached,
            hasCashed,
            withdrawerCount,
            withdrawDelay
        };
    }));

    return presaleData;
}

export const getPresaleDataByAddress = async (presale: `0x${string}`) => {
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
        withdrawDelay
    ] = await Promise.all([
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "metadataURI"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "paymentToken"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "saleToken"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "salePrice"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "startTime"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "endTime"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "minTotalPayment"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "maxTotalPayment"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "softCap"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "hardCap"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "totalPaymentReceived"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "purchaserCount"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "isSoftCapReached"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "hasCashed"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "withdrawerCount"
        }),
        client.readContract({
            address: presale,
            abi: Presale,
            functionName: "withdrawDelay"
        }),
    ]);

    const paymentTokenName = await client.readContract({
        address: paymentToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "name"
    });

    const paymentTokenSymbol = await client.readContract({
        address: paymentToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "symbol"
    });

    const paymentTokenDecimals = await client.readContract({
        address: paymentToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "decimals"
    });


    const saleTokenName = await client.readContract({
        address: saleToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "name"
    })

    const saleTokenSymbol = await client.readContract({
        address: saleToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "symbol"
    });

    const saleTokenDecimals = await client.readContract({
        address: saleToken as `0x${string}`,
        abi: ERC20ABI,
        functionName: "decimals"
    });

    return {
        id: presale,
        metadataURI,
        paymentToken: {
            id: paymentToken,
            name: paymentTokenName,
            symbol: paymentTokenSymbol,
            decimals: paymentTokenDecimals
        },
        saleToken: {
            id: saleToken,
            name: saleTokenName,
            symbol: saleTokenSymbol,
            decimals: saleTokenDecimals
        },
        salePrice: ethers.formatUnits(salePrice as string, paymentTokenDecimals as number),
        startTime: Number(startTime),
        endTime: Number(endTime),
        minTotalPayment: ethers.formatUnits(minTotalPayment as string, paymentTokenDecimals as number),
        maxTotalPayment: ethers.formatUnits(maxTotalPayment as string, paymentTokenDecimals as number),
        softCap: ethers.formatUnits(softCap as string, paymentTokenDecimals as number),
        hardCap: ethers.formatUnits(hardCap as string, paymentTokenDecimals as number),
        totalPaymentReceived: ethers.formatUnits(totalPaymentReceived as string, paymentTokenDecimals as number),
        purchaserCount: Number(purchaserCount),
        isSoftCapReached,
        hasCashed,
        withdrawerCount,
        withdrawDelay
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
            functionName: "claimable",
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