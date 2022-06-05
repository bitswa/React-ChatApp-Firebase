import { useContext } from 'react';
import { FirebaseContext } from '../contexts/FirebaseContext';
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const { signed } = useContext(FirebaseContext);

  if(!signed) {
    return <Navigate to='/' />
  }

  return signed ? <Outlet /> : <Navigate to='/' />
}