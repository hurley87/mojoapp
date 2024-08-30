'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function GetStarted({ username }: { username: string }) {
  console.log('username:', username);
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const claimUsername = async () => {
    try {
      //   claim logic
    } catch (error) {
      console.error('Error claiming username:', error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };

  console.log('connectors:', connectors);

  return (
    <div>
      <div>
        <h2>{username || ''}</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors
          .filter((connector) => connector?.type === 'coinbaseWallet')
          .map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </div>
  );
}
