import {
  // GoogleAuthProvider,
  signOut,
  // signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  updateProfile,
  sendEmailVerification,
  UserCredential,
  // updateProfile,
} from "firebase/auth";
import React, { createContext, useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import auth from "./firebase/firebase";
import axiosInstance from "../service/axios";
import SignUpForm from "./auth-dialogs/SignUpForm";
import SignInForm from "./auth-dialogs/SignInForm";

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthContextType {
  authUser: User | null;
  signOutFromWebsite: () => JSX.Element;
  signUpEmailPwd: (
    email: string,
    password: string,
    displayName: string
  ) => void;
  signInEmailPwd: (email: string, password: string) => Promise<UserCredential>;
  // signInGoogle: () => void;
  authLoading: boolean;
  idToken: string | null;
  setOpenSignIn: (open: boolean) => void;
  setOpenSignUp: (open: boolean) => void;
  unauthenticated: boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// const provider = new GoogleAuthProvider();

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  signOutFromWebsite: () => <Navigate to="/" />,
  signUpEmailPwd: () => {},
  signInEmailPwd: async () => {
    return Promise.reject(new Error("Function not implemented"));
  },
  // signInGoogle: () => {},
  authLoading: true,
  idToken: null,
  setOpenSignIn: () => {},
  setOpenSignUp: () => {},
  unauthenticated: true,
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      if (user)
        user?.getIdToken().then((token) => {
          setIdToken(token);
        });
      else setIdToken(null);

      setAuthLoading(false);
    });

    return () => {
      listen();
    };
  }, []);

  // Sempre que idToken mudar, atualiza o cabeçalho Authorization
  useEffect(() => {
    if (idToken) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${idToken}`;
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  }, [idToken]);

  // const signInGoogle = async () => {
  //   signInWithPopup(auth, provider).catch((error) => {
  //     alert(error.message);
  //   });
  // };

  const signInEmailPwd = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUpEmailPwd = (
    email: string,
    password: string,
    displayName: string
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(userCredential.user);
        updateProfile(userCredential.user, {
          displayName: displayName,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signOutFromWebsite = () => {
    signOut(auth)
      .then(() => {
        console.warn("signed out");
        setAuthUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
    return <Navigate to="/" />;
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        signOutFromWebsite,
        signUpEmailPwd,
        signInEmailPwd,
        // signInGoogle,
        authLoading,
        idToken,
        setOpenSignIn,
        setOpenSignUp,
        unauthenticated: !authLoading && !authUser,
      }}
    >
      {children}
      <SignUpForm open={openSignUp} onClose={() => setOpenSignUp(false)} />
      <SignInForm open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
