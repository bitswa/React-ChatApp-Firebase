import { useContext, useEffect } from 'react';
import { FirebaseContext } from '../contexts/FirebaseContext';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';

export const PrivateRoute = () => {
  const navigate = useNavigate();

  const { signed } = useContext(FirebaseContext);

  useEffect(() => {
    if (!signed) {
      return navigate('/');
    }
  });

  return signed ? <Outlet /> : <Navigate to='/' />
}