import { createContext } from 'react';
import { useState, useEffect, useContext } from 'react';
import { auth, User } from 'firebase/app';
import { useRouter } from 'next/router';

export const AuthContext = createContext<Auth>({
  isSignedIn: false,
  pending: true,
  user: null,
  auth,
});

export interface Auth {
  isSignedIn: boolean;
  pending: boolean;
  user: User;
  auth(): auth.Auth;
}

export function useAuth(): Auth {
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = auth().onAuthStateChanged((user) =>
      setAuthState({ user, pending: false, isSignedIn: !!user })
    );
    return () => unregisterAuthObserver();
  }, []);

  return { auth, ...authState };
}

export function useAuthRequiredRedirect() {
  const authState = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    if (!authState.pending && !authState.isSignedIn) {
      router.push('/login');
    }
  }, [authState.pending, authState.isSignedIn, router]);
}
