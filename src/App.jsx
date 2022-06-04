import { FirebaseContextProvider } from './contexts/FirebaseContext';
import { AppRoutes } from './routes/Routes';

export const App = () => {
  return (
    <FirebaseContextProvider>
      <AppRoutes />
    </FirebaseContextProvider>
  )
}