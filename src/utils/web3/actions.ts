import stakingPoolActionsABI from "../../abis/StakingPoolActions.json"
import stakingPoolABI from "../../abis/StakingPool.json"
import ERC20ABI from "../../abis/ERC20.json"
import { publicClient as client } from "../../config"

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