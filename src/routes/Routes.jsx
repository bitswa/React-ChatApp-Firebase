import {
  BrowserRouter as Router,
  Routes, Route,
} from 'react-router-dom';
import { Login } from '../pages/login';
import { Home } from '../pages/home';
import { PrivateRoute } from './PrivateRoute';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/me' element={<PrivateRoute />}>
          <Route path='/me' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  )
}