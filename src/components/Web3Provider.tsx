'use client'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { WagmiProvider, cookieStorage, createStorage, createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { walletConnect, coinbaseWallet, injected } from 'wagmi/connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState, useEffect, useMemo } from 'react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || '3a8170812b534d0ff9d794f19a901d64'

// 2. Create wagmiConfig
const metadata = {
  name: 'EasyPicks',
  description: 'Transparent Crypto Pick\'em on Base',
  url: 'https://easypicks.app', // Modern apps should use a proper URL
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 2. Create wagmiConfig
  const config = useMemo(() => createConfig({
    chains: [base],
    transports: {
      [base.id]: http()
    },
    connectors: mounted ? [
      walletConnect({ projectId, metadata, showQrModal: false }),
      injected({ shimDisconnect: true }),
      coinbaseWallet({
        appName: metadata.name,
        appLogoUrl: metadata.icons[0]
      })
    ] : [],
    ssr: true,
    storage: createStorage({
      storage: cookieStorage
    })
  }), [mounted])

  // Use useState for queryClient to ensure it's only created once
  const [queryClient] = useState(() => new QueryClient())

  // Initialize Web3Modal on client side after component mounts
  useEffect(() => {
    if (mounted) {
      createWeb3Modal({
        wagmiConfig: config,
        projectId,
        enableAnalytics: true,
        enableOnramp: true,
        themeMode: 'dark',
      });
    }
  }, [mounted, config]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}




