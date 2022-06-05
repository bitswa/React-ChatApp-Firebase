import { useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { FirebaseContext } from '../../contexts/FirebaseContext';

export const Login = () => {
  
  const { googleSignIn, signed } = useContext(FirebaseContext);

  const googleLogin = async () => await googleSignIn();

  if(signed) {
    return <Navigate to='/me' />
  }

  return (
    <div className='c-login'>
      <button onClick={googleLogin}>
        Login with google
      </button>
    </div>
  )
}