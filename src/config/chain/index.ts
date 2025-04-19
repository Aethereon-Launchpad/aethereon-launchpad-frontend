import { defineChain } from "viem";

export const sonic_testnet = defineChain({
    id: 57054,
    name: 'Sonic Testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Sonic',
        symbol: 'S',
    },
    rpcUrls: {
        default: { http: ['https://rpc.blaze.soniclabs.com'] },
    },
    blockExplorers: {
        default: {
            name: 'Sonic Testnet Explorer',
            url: 'https://testnet.soniclabs.com/',
        },
    },
    contracts: {
        multicall3: {
            address: '0x81b9415985d98C8aFE3aD2D39E37aF9a23c74922',
            blockCreated: 33803979,
        },
    },
    testnet: true,
})

export const rise_testnet = defineChain({
    id: 11155931,
    name: "Rise Testnet",
    nativeCurrency: {
        decimals: 18,
        name: 'Ethereum',
        symbol: 'ETH',
    },
    rpcUrls: {
        default: {
            http: [
                // Primary RPC endpoint
                'https://testnet.riselabs.xyz',
                // Fallback RPC endpoints - using public providers
                'https://sepolia.base.org',
                'https://base-sepolia-rpc.publicnode.com',
                'https://1rpc.io/base-sepolia'
            ]
        },
    },
    blockExplorers: {
        default: {
            name: 'Rise Testnet Explorer',
            url: 'https://explorer.testnet.riselabs.xyz',
        },
    },
    contracts: {
        multicall3: {
            address: '0x669eF34fC6b12A0E0802C2BB0f6Bae05187a908D',
            blockCreated: 9917865,
        },
    },
    testnet: true,
})