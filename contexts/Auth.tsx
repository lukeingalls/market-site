import { createContext, Context, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase/firebase";
import firebase from "firebase";
import fetcher from "../lib/fetcher";
import { User } from "../lib/db/models";

export interface Auth {
  signInWithGoogle: () => Promise<firebase.auth.UserCredential | void>;
  currentUser: firebase.User;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | void>;
}

const AuthContext: Context<Auth> = createContext<Auth>({
  currentUser: undefined,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  getToken: async () => {},
});

export default function AuthProvider({ children }) {
  const [contextAuth, setContextAuth] = useState<firebase.User>(null);

  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    return auth.signInWithPopup(provider);
  }

  function signOut() {
    return auth.signOut();
  }

  function getIdToken() {
    return contextAuth?.getIdToken();
  }

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (authState: firebase.User | null) => {
        setContextAuth(authState);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    (async () => {
      if (contextAuth) {
        try {
          const token = await getIdToken();
          const user: User = await fetcher("/api/get-user-data", token);
          console.log(user);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [contextAuth]);

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        signOut,
        getToken: getIdToken,
        currentUser: contextAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
