import  { type ReactNode } from 'react'
import { wagmiAdapter, projectId } from '../config'
import { createAppKit } from '@reown/appkit'
import { mainnet, etherlink } from '@reown/appkit/networks'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

if (!projectId) {
    throw new Error('Project ID is required');
}

const metadata = {
    name: 'DerHex',
    description: 'DerHex is a decentralized platform that allows users to stake, farm, and participate in IDOs.',
    url: 'https://derhex.com',
}

const modal = createAppKit({
    adapters: [wagmiAdapter],
    networks: [mainnet, etherlink],
    defaultNetwork: mainnet,
    projectId,
    features: {
        analytics: true,
        email: true,
        socials: ['apple', 'x', 'google', 'farcaster', 'discord', 'github'],
        emailShowWallets: true,
    },
    themeMode: 'dark',
})

function AppProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={new QueryClient()}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default AppProvider
