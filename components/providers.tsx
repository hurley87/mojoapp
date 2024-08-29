'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { chain } from '@/constants/chain';

export default function Providers({ children }: { children: React.ReactNode }) {
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
      {children}
    </PrivyProvider>
  );
}
