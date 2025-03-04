import { type ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const metadata = {
    name: 'DerHex',
    description: 'DerHex is a decentralized platform that allows users to stake, farm, and participate in IDOs.',
    url: 'https://derhex.com',
}


function AppProvider({ children }: { children: ReactNode }) {

    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
        </QueryClientProvider>
    )
}

export default AppProvider
