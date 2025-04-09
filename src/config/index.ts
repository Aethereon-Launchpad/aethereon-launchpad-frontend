import { createConfig } from '@privy-io/wagmi';
import { baseSepolia } from 'viem/chains';
import { http } from 'wagmi';
import type { PrivyClientConfig } from '@privy-io/react-auth';
import { createPublicClient } from 'viem';


export const config = createConfig({
  chains: [baseSepolia], // Pass your required chains as an array
  transports: {
    [baseSepolia.id]: http(),
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

export const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http()
})