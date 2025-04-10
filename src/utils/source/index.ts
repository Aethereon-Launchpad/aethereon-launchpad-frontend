// Contract addresses for different chains
export const service = {
    // Base Sepolia Testnet
    "84532": {
        stakingPoolFactory: "0xa13019Be1C39625332D996b56A4555217035324e",
        drxToken: "0x609C524338820a84fA1BeC5f5aBAd43A310EEC1A",
        usdToken: "0x472158C2bBE156bAAe0D4cbeeb81774502768C65",
        stakeLock: "0xAaDF28c729269AD1E0a775C70060b669985661e5",
        presaleFactory: "0xbF9a21db747b5b3eD4F43B9e36971C7808fE8CC9",
        airdropFactory: "0x2508dc55a2d52198694507Ad8E49307c78B2d6eb",
        bondFactory:"0xa34562047AED5F04ccDb1aC99B7682708Da669Bc"
    }
} as const;

// Default chain ID (Base Sepolia Testnet)
export const CHAIN_ID = "84532";

// Helper function to get contract addresses
export const getContractAddress = (contractName: keyof typeof service[typeof CHAIN_ID]): `0x${string}` => {
    return service[CHAIN_ID][contractName] as `0x${string}`;
};