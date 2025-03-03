import { createConfig } from '@privy-io/wagmi';
import { sonic, sonicTestnet } from "viem/chains";
import { http } from 'wagmi';
import type { PrivyClientConfig } from '@privy-io/react-auth';
import { addRpcUrlOverrideToChain } from '@privy-io/react-auth';
import { createPublicClient } from 'viem';

export const sonicOveride = addRpcUrlOverrideToChain(sonic, "https://rpc.ankr.com/sonic_mainnet")

export const config = createConfig({
  chains: [sonic, sonicTestnet], // Pass your required chains as an array
  transports: {
    [sonic.id]: http(),
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
  chain: sonic,
  transport: http()
})