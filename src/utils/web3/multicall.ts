import { Abi, AbiFunction, encodeFunctionData, decodeFunctionResult } from 'viem'

/**
 * Encodes function data for multicall
 * @param address - Contract address
 * @param abi - Contract ABI
 * @param functionName - Function name to call
 * @param args - Function arguments
 * @returns Encoded function data
 */
export const encodeMulticallData = (
    address: `0x${string}`,
    abi: readonly AbiFunction[],
    functionName: string,
    args: any[] = []
): `0x${string}` => {
    const abiFunction = abi.find(
        (item) => item.type === 'function' && item.name === functionName
    );

    if (!abiFunction) {
        throw new Error(`Function ${functionName} not found in ABI`)
    }

    return encodeFunctionData({
        abi: [abiFunction],
        functionName,
        args
    })
}

/**
 * Decodes function result from multicall
 * @param abi - Contract ABI
 * @param functionName - Function name that was called
 * @param data - Encoded result data
 * @returns Decoded function result
 */
export const decodeMulticallResult = (
    abi: readonly AbiFunction[],
    functionName: string,
    data: `0x${string}`
): any => {
    const abiFunction = abi.find(
        (item) => item.type === 'function' && item.name === functionName
    );

    if (!abiFunction) {
        throw new Error(`Function ${functionName} not found in ABI`)
    }

    return decodeFunctionResult({
        abi: [abiFunction],
        functionName,
        data
    })
}

/**
 * Creates a multicall call object
 * @param address - Contract address
 * @param abi - Contract ABI
 * @param functionName - Function name to call
 * @param args - Function arguments
 * @returns Multicall call object
 */
export const createMulticallCall = (
    address: `0x${string}`,
    abi: Abi,
    functionName: string,
    args: any[] = []
) => {
    return {
        address,
        abi,
        functionName,
        args,
        encodedData: encodeMulticallData(address, abi, functionName, args)
    }
} 