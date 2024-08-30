'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { createSmartAccountClient, PaymasterMode } from '@biconomy/account';
import { createPublicClient, encodeFunctionData, http } from 'viem';
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
  console.log('chain', chain);
  console.log('address', address);
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL as string;
  const biconomyPaymasterApiKey = process.env.NEXT_PUBLIC_B_KEY as string;

  const claimUsername = async () => {
    try {
      const provider = await embeddedWallet?.getEthersProvider();
      const signer = provider?.getSigner();

      if (!signer) {
        throw new Error('Signer not available');
      }

      const smartAccount = await createSmartAccountClient({
        signer: signer,
        chainId: chain.id,
        bundlerUrl,
        biconomyPaymasterApiKey,
      });

      const bundlerClient = createBundlerClient({
        account: address,
        client: publicClient,
        transport: http(bundlerUrl),
      });

      const data = encodeFunctionData({
        abi: Claim.abi,
        functionName: 'claimUsername',
        args: [username],
      });

      const userOpResponse = await smartAccount.sendTransaction(
        {
          to: '0xe563Fa132d56Afa6eF2c9C4368CC4B6dc53920A4',
          data,
        },
        {
          paymasterServiceData: { mode: PaymasterMode.SPONSORED },
        }
      );

      const { transactionHash } = await userOpResponse.waitForTxHash();

      const userOpReceipt = await userOpResponse.wait();

      console.log('smartAccount', smartAccount);
      console.log('bundlerClient', bundlerClient);
      console.log('mintTxData', data);
      console.log('userOpResponse', userOpResponse);
      console.log('transactionHash', transactionHash);

      if (userOpReceipt.success === 'true') {
        console.log('UserOp receipt', userOpReceipt);
        console.log('Transaction receipt', userOpReceipt.receipt);
      }
    } catch (error) {
      console.error('Error claiming username:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
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
