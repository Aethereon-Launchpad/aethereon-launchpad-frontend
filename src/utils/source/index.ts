// Contract addresses for different chains
export const service = {
    // Base Sepolia Testnet
    "84532": {
        stakingPoolFactory: "0xc9762e2bc5f9A398b52e70B65c4620a85a2081DE",
        drxToken: "0xFA64E2FDbf9ba4880043c16311C7b5A425c1c52F",
        usdToken: "0xBaB33cC1E26ADa9be8E0a00b581bd3951EC94200",
        stakeLock: "0xb054d93eB2ac18C5D4761198670AEaf8c2c03df0",
        presaleFactory: "0xbe48cA8B76CE3c9cd71a459eF4cA86E57df84B01",
        airdropFactory: "0x87A9A7121Dc25C41CfC88EeaE116Fea10029f8C4",
        bondFactory:"0x7E4CD92749c00875cB56F542dF81D0B683Fc051A"
    }
} as const;

// Default chain ID (Base Sepolia Testnet)
export const CHAIN_ID = "84532";

// Helper function to get contract addresses
export const getContractAddress = (contractName: keyof typeof service[typeof CHAIN_ID]): `0x${string}` => {
    return service[CHAIN_ID][contractName] as `0x${string}`;
};