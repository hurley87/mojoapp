'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function GetStarted() {
  const { user, login } = usePrivy();
  const username = user?.telegram?.username;
  const address = user?.wallet?.address;

  console.log('address', address);

  return (
    <div>
      {user && (
        <div className="flex flex-col gap-3">
          <div>{username}</div>
          <div>{address}</div>
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
