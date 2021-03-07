import { createContext, Context, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase/firebase";
import firebase from "firebase";
import fetcher from "../lib/fetcher";
import { UserAttributes } from "../lib/db/models";

export interface Auth {
  signInWithGoogle: () => Promise<firebase.auth.UserCredential | void>;
  currentUser: firebase.User;
  signOut: () => Promise<void>;
  token: string;
  userData: UserAttributes;
}

const AuthContext: Context<Auth> = createContext<Auth>({
  currentUser: undefined,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  token: undefined,
  userData: undefined,
});

export default function AuthProvider({ children }) {
  function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    return auth.signInWithPopup(provider);
  }

  function signOut() {
    return auth.signOut();
  }

  const [authValue, setAuthValue] = useState<Auth>({
    currentUser: undefined,
    signInWithGoogle,
    signOut,
    token: undefined,
    userData: undefined,
  });

  useEffect(() => {
    const auth_unsubscribe = firebase
      .auth()
      .onAuthStateChanged(async (authState: firebase.User | null) => {
        if (authState) {
          try {
            const token = await authState.getIdToken();
            const user: UserAttributes = await fetcher(
              "/api/get-user",
              token,
              "GET"
            );
            setAuthValue({
              ...authValue,
              currentUser: authState,
              token,
              userData: user,
            });
          } catch (error) {
            console.error(error);
          }
        } else {
          setAuthValue({
            ...authValue,
            currentUser: undefined,
            token: undefined,
            userData: undefined,
          });
        }
      });

    return () => {
      auth_unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authValue,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
