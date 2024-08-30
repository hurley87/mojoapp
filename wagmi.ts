import { http, cookieStorage, createConfig, createStorage } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';

export function getConfig() {
  const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string;
  return createConfig({
    chains: [baseSepolia],
    connectors: [injected(), coinbaseWallet(), walletConnect({ projectId })],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseSepolia.id]: http(),
    },
  });
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>;
  }
}
