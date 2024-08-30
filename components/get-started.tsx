'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function GetStarted() {
  const { user, login } = usePrivy();
  const username = user?.telegram?.username;
  const address = user?.wallet?.address as `0x${string}`;

  const claimUsername = async () => {
    try {
      //   claim logic
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
          <div>
            <button type="button" onClick={claimUsername}>
              Claim Username
            </button>
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
