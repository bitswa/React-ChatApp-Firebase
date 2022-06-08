import { FirebaseContextProvider } from './contexts/FirebaseContext';
import { AppRoutes } from './routes/Routes';
import './style.css';

export const App = () => {
  return (
    <FirebaseContextProvider>
      <AppRoutes />
    </FirebaseContextProvider>
  )
}