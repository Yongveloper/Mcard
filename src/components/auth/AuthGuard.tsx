import { useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/remote/firebase';

// 인증 처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);

  onAuthStateChanged(auth, (user) => {
    console.log('user', user);
    setInitialize(true);
  });

  if (!initialize) {
    return <div>인증 처리중 .. 로딩중 ...</div>;
  }

  return <>{children}</>;
}

export default AuthGuard;
