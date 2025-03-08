import { createConfig } from '@privy-io/wagmi';
import { sonicTestnet } from './chain';
import { http } from 'wagmi';
import type { PrivyClientConfig } from '@privy-io/react-auth';
import { addRpcUrlOverrideToChain } from '@privy-io/react-auth';
import { createPublicClient } from 'viem';


export const config = createConfig({
  chains: [sonicTestnet], // Pass your required chains as an array
  transports: {
    [sonicTestnet.id]: http(),
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
  chain: sonicTestnet,
  transport: http()
})