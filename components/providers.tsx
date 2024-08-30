'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { chain } from '@/constants/chain';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BiconomyProvider } from '@biconomy/use-aa';

export default function Providers({ children }: { children: React.ReactNode }) {
  const biconomyPaymasterApiKey = process.env.NEXT_PUBLIC_B_KEY || '';
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || '';

  const config = createConfig({
    chains: [chain],
    transports: {
      [chain.id]: http(),
    },
  });

  const queryClient = new QueryClient();

  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;
  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ['telegram', 'wallet'],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        appearance: {
          theme: 'dark',
        },
        defaultChain: chain,
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <BiconomyProvider
            config={{
              biconomyPaymasterApiKey,
              bundlerUrl,
              // Add your signer here if you don't want to use the metamask signer
            }}
            queryClient={queryClient}
          >
            {children}
          </BiconomyProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}
