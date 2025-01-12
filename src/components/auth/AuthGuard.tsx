import { useState } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/remote/firebase';
import { userAtom } from '@/atom/user';
import { useSetAtom } from 'jotai';

// 인증 처리
function AuthGuard({ children }: { children: React.ReactNode }) {
  const [initialize, setInitialize] = useState(false);
  const setUser = useSetAtom(userAtom);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser({
        uid: user.uid,
        email: user.email ?? '',
        displayName: user.displayName ?? '',
        photoURL: user.photoURL ?? '',
      });
    } else {
      setUser(null);
    }

    setInitialize(true);
  });

  if (!initialize) {
    return null;
  }

  return <>{children}</>;
}

export default AuthGuard;
