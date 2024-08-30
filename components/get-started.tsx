'use client';

import { usePrivy } from '@privy-io/react-auth';
import { encodeFunctionData } from 'viem';
import Claim from '@/lib/abis/Claim.json';
import {
  useSendSponsoredTransaction,
  useSmartAccount,
  useUserOpWait,
} from '@biconomy/use-aa';

export default function GetStarted() {
  const { user, login } = usePrivy();
  const username = user?.telegram?.username;
  const address = user?.wallet?.address as `0x${string}`;
  const { smartAccountAddress } = useSmartAccount();
  const {
    mutate,
    data: userOpResponse,
    error,
    isPending,
  } = useSendSponsoredTransaction();

  const {
    isLoading: waitIsLoading,
    isSuccess: waitIsSuccess,
    error: waitError,
    data: waitData,
  } = useUserOpWait(userOpResponse);

  const claimUsername = async () => {
    try {
      const data = encodeFunctionData({
        abi: Claim.abi,
        functionName: 'claimUsername',
        args: [username],
      });

      console.log('mintTxData', data);

      mutate({
        transactions: {
          to: '0xe563Fa132d56Afa6eF2c9C4368CC4B6dc53920A4',
          data,
        },
      });
    } catch (error) {
      console.error('Error claiming username:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  console.log('waitData', waitData);
  console.log('waitIsSuccess', waitIsSuccess);
  console.log('smartAccountAddress', smartAccountAddress);

  return (
    <div>
      {user && (
        <div className="flex flex-col gap-3">
          <div>{username}</div>
          <div>{address}</div>
          <div>
            <button type="button" onClick={claimUsername}>
              {waitIsLoading || isPending ? 'Executing...' : 'Mint an NFT'}
            </button>
            {(error || waitError) ?? ''}
          </div>
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
