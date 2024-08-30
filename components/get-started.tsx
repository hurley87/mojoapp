'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { createSmartAccountClient } from '@biconomy/account';
import { createPublicClient, http } from 'viem';
import { chain } from '@/constants/chain';
import { createBundlerClient } from 'viem/account-abstraction';
import Claim from '@/lib/abis/Claim.json';

export default function GetStarted() {
  const { user, login } = usePrivy();
  const username = user?.telegram?.username;
  const address = user?.wallet?.address as `0x${string}`;
  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === 'privy'
  );
  const publicClient = createPublicClient({
    chain,
    transport: http('https://sepolia.base.org'),
  });

  console.log('address', address);
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL as string;
  const biconomyPaymasterApiKey = process.env.NEXT_PUBLIC_B_KEY as string;

  const claimUsername = async () => {
    const provider = await embeddedWallet?.getEthersProvider();
    const signer = provider?.getSigner();

    if (!signer) {
      console.error('Signer not available');
      return;
    }

    const smartAccount = await createSmartAccountClient({
      signer: signer,
      bundlerUrl,
      biconomyPaymasterApiKey,
    });

    const bundlerClient = createBundlerClient({
      account: address,
      client: publicClient,
      transport: http(bundlerUrl),
    });

    console.log('smartAccount', smartAccount);
    console.log('bundlerClient', bundlerClient);
  };

  return (
    <div>
      {user && (
        <div className="flex flex-col gap-3">
          <div>{username}</div>
          <div>{address}</div>
          <button onClick={claimUsername}>Claim Username</button>
        </div>
      )}
      {!user && (
        <div className="flex flex-col gap-3">
          <button onClick={login}>Login</button>
        </div>
      )}
    </div>
  );
}
