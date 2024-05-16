'use client';

import { deleteCookie, setCookie } from 'cookies-next';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { USER_EMAIL_COOKIE_NAME } from '@/constants';
import firebaseAuth from '@/firebase/auth';
import useNotification from '@/hooks/useNotification';
import type { User } from '@/types';

type AuthContextType = {
  user: User | null;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  logOut: async () => {},
  isLoading: true,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { showNotification } = useNotification();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = useCallback(async () => {
    try {
      const provider = new GoogleAuthProvider();
      const user = await signInWithPopup(firebaseAuth, provider);
      if (user.user) {
        showNotification({
          title: 'Sign In Successfully',
          variant: 'success',
        });
      }
      router.push('/dashboard');
    } catch (error) {
      showNotification({
        title: 'Sign In Failed',
        variant: 'failure',
      });
    }
  }, [showNotification, router]);

  const logOut = useCallback(async () => {
    try {
      await signOut(firebaseAuth);
      showNotification({
        title: 'Log Out Successfully',
        variant: 'success',
      });
    } catch (error) {
      showNotification({
        title: 'Log Out Failed',
        variant: 'failure',
      });
    }
  }, [showNotification]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        deleteCookie(USER_EMAIL_COOKIE_NAME);
        router.push('/');
      } else {
        setUser({
          name: currentUser.displayName ?? '',
          email: currentUser.email ?? '',
          photoUrl: currentUser.photoURL ?? '',
        });
        setCookie(USER_EMAIL_COOKIE_NAME, currentUser.email);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [showNotification, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
