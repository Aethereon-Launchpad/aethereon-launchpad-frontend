import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from "react-hot-toast"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { apolloClient } from './graphql/client.ts';
import { ApolloProvider } from '@apollo/client'
import { privyConfig, config as wagmiConfig } from './config/index.ts'
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { ChainProvider } from './context/ChainContext';

const APP_ID = "cm7mrovwa02hggvx2noy1itlu"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <PrivyProvider appId={APP_ID} config={privyConfig}>
          <QueryClientProvider client={queryClient}>
            <WagmiProvider config={wagmiConfig}>
              <ChainProvider>
                <App />
              </ChainProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </PrivyProvider>
        <Toaster
          containerClassName="font-space"
        />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
