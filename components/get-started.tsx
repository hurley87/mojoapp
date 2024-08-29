'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function GetStarted() {
  const { user, login, logout } = usePrivy();
  const username = user?.telegram?.username;

  console.log('user', user);

  return (
    <div>
      {user && (
        <div className="flex flex-col gap-3">
          <div>{username}</div>
          <button onClick={logout} className="bg-red-500 text-white">
            Logout
          </button>
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
