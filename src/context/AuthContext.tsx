"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import firebaseAuth from "@/firebase/auth";
import useNotification from "@/hooks/useNotification";

type User = {
  name: string | null;
  email: string | null;
  photoUrl: string | null;
};

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
          title: "Sign In Successful",
        });
      }
      router.push("/dashboard");
    } catch (error) {
      showNotification({
        title: "Sign In Failed",
      });
    }
  }, [showNotification, router]);

  const logOut = useCallback(async () => {
    try {
      await signOut(firebaseAuth);
      showNotification({
        title: "Log Out Successful",
      });
    } catch (error) {
      showNotification({
        title: "Log Out Failed",
      });
    }
  }, [showNotification]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        setUser(null);
        router.push("/");
      } else {
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL,
        });
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
