'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function GetStarted() {
  const { user, login } = usePrivy();
  console.log(user);
  const username = user?.telegram?.username;
  return (
    <div>
      {user && <div>{username}</div>}
      {!user && <button onClick={login}>Login</button>}
    </div>
  );
}
