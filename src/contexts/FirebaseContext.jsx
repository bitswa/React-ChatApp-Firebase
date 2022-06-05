import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Navigate } from 'react-router-dom';

export const FirebaseContext = createContext();

export const FirebaseContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getStoragedUser = () => {
      const localUser = localStorage.getItem('@user');
      const localToken = localStorage.getItem('@token');
      if (localUser && localToken) { 
        setUser(localUser)
      }
    }
    getStoragedUser();
  }, []);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(JSON.stringify(user));
        localStorage.setItem('@user', JSON.stringify(user));
        localStorage.setItem('@token', token);
      }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  }

  const signOut = () => {
    localStorage.removeItem('@user');
    localStorage.removeItem('@token');
    setUser(null)
    return <Navigate to='/' />
  }

  const value = {
    googleSignIn,
    signOut,
    user,
    signed: !!user,
  }

  return (
    <FirebaseContext.Provider value={value}>
      { children }
    </FirebaseContext.Provider>
  )
}