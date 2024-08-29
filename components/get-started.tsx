'use client';

import { usePrivy } from '@privy-io/react-auth';

export default function GetStarted() {
  const { user, login } = usePrivy();
  console.log(user);
  return (
    <div>
      {user && <div>you are in</div>}
      {!user && <button onClick={login}>Login</button>}
    </div>
  );
}
