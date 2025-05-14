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
        bondFactory: "0x0A03B6a30EA2cFB66e0B98261211aD6289083154",
        owner: "0xd92CEB7B20D7fe095D4f1f6D373FeC6A934034FC"
    },
    "57054": {
        stakingPoolFactory: "0xbA3a59322d420860dA314b6544F8c9F35f45f9B6",
        drxToken: "0xdEB561F9216576B41D6E67414c81Ff0fdbba5b46",
        usdToken: "0xed037aEdBa23ab04078f7726fAc978187daCefd2",
        stakeLock: "0x964D03Ea76D43FBd6160834DC85A9BaF09D4993e",
        presaleFactory: "0x96B5FE7fb64714F57271162E5E191660545a200D",
        airdropFactory: "0x5F3b938f3a8343C946824334C3b783ed1e3503A0",
        bondFactory: "0x502589Ae450b8581a000D7A01F9b2907673B0fEF",
        owner: "0x426DcF053185c099cbE05dcb23775544bbEe16d6"
    },
    "11155931": {
        stakingPoolFactory: "0x9B44F55A3e9ae8f6415Ee96083E1193F6f7A2998",
        drxToken: "0xc9762e2bc5f9A398b52e70B65c4620a85a2081DE",
        usdToken: "0xFA64E2FDbf9ba4880043c16311C7b5A425c1c52F",
        stakeLock: "0xBaB33cC1E26ADa9be8E0a00b581bd3951EC94200",
        presaleFactory: "0xb054d93eB2ac18C5D4761198670AEaf8c2c03df0",
        airdropFactory: "0xD018b00cd91Cf0dDb83DF4CA01711dE831Fb95B6",
        bondFactory: "0x54d224E87d0DbA4600A5381845f556aDfAd25900",
        owner: "0xd92CEB7B20D7fe095D4f1f6D373FeC6A934034FC"
    },
    "245022926":{
        owner: "0xd92CEB7B20D7fe095D4f1f6D373FeC6A934034FC"
    }
} as const;


export const getChainName = (chainId: string): string => {
    switch (chainId) {
        case "84532":
            return "Base Sepolia Testnet";
        case "57054":
            return "Sonic Testnet";
        case "11155931":
            return "Rise Testnet";
        default:
            return "Unknown Chain";
    }
}

// Default chain ID (Rise Testnet)
export const DEFAULT_CHAIN_ID = "11155931" as const;

// Helper function to get the current chain ID
// This will be used by components that don't have access to the context
// Initialize from localStorage if available
const savedChain = typeof window !== 'undefined' ? localStorage.getItem('selected_chain_id') : null;
const initialChain = (savedChain && savedChain in service) ? savedChain as keyof typeof service : DEFAULT_CHAIN_ID;

// Global variable to track the current chain ID
export let CHAIN_ID: keyof typeof service = initialChain;

console.log(`source/index.ts: Initial CHAIN_ID set to ${CHAIN_ID}`);

// Function to update the current chain ID
export const setCurrentChainId = (chainId: keyof typeof service) => {
    try {
        if (!(chainId in service)) {
            console.error(`source/index.ts: Invalid chain ID: ${chainId}`);
            return;
        }

        console.log(`source/index.ts: Setting CHAIN_ID from ${CHAIN_ID} to ${chainId}`);
        CHAIN_ID = chainId;

        // Save to localStorage for persistence
        if (typeof window !== 'undefined') {
            localStorage.setItem('selected_chain_id', chainId);
        }

        return true;
    } catch (error) {
        console.error(`source/index.ts: Error setting chain ID:`, error);
        return false;
    }
};

export const getOwnerAddress = (chainId: keyof typeof service = CHAIN_ID) => {
    return service[chainId].owner;
}

// Helper function to get contract addresses
export const getContractAddress = <T extends keyof typeof service[typeof DEFAULT_CHAIN_ID]>(
    contractName: T,
    chainId: keyof typeof service = CHAIN_ID
): `0x${string}` => {
    return service[chainId][contractName];
};