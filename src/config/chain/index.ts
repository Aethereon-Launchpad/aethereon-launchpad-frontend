import { defineChain } from "viem";

export const sonicTestnet = defineChain({
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
    testnet: true,
})