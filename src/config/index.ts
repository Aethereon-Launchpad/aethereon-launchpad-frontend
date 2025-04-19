import { createConfig } from '@privy-io/wagmi';
import { baseSepolia } from 'viem/chains';
import { http } from 'wagmi';
import type { PrivyClientConfig } from '@privy-io/react-auth';
import { createPublicClient } from 'viem';
import { sonic_testnet, rise_testnet } from './chain';

// Create a mapping of chain IDs to viem chains
export const chainMapping = {
  "84532": baseSepolia,
  "57054": sonic_testnet,
  "11155931": rise_testnet,
};

export const config = createConfig({
  chains: [baseSepolia, sonic_testnet, rise_testnet], // Include all supported chains
  transports: {
    [baseSepolia.id]: http(),
    [sonic_testnet.id]: http(),
    [rise_testnet.id]: http(),
  },
});

export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
    showWalletUIs: true,
  },
  loginMethods: ['wallet'],
  appearance: {
    showWalletLoginFirst: true,
  },
};

// Default public client - this will be replaced by the dynamic client from ChainContext
export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http()
})