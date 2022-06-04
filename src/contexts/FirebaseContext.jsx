import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Navigate } from 'react-router-dom';

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {

  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getStoragedUser = () => {
      const sessionUser = sessionStorage.getItem('@user');
      const sessionToken = sessionStorage.getItem('@token');
      if (sessionUser && sessionToken) { 
        setUser(sessionUser) 
      }
    }
    getStoragedUser();
  }, [])

  const googleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUser(JSON.stringify(user));
      sessionStorage.setItem('@user', JSON.stringify(user));
      sessionStorage.setItem('@token', token);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
  }

  const signOut = () => {
    sessionStorage.removeItem('@user');
    sessionStorage.removeItem('@token');
    setUser(null)
    return <Navigate to='/' />
  }

  const value = {
    googleSignIn,
    user,
    signOut,
    signed: !!user,
  }

  return (
    <FirebaseContext.Provider value={value}>
      { children }
    </FirebaseContext.Provider>
  )
}