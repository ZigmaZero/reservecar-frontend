import { Route, Routes } from 'react-router-dom';
import Checkin from './pages/Checkin';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/checkin" element={<Checkin />} />
    <Route path="/checkout" element={<Checkout />}/>
    <Route path="/admin" element={<Home />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
  </Routes>
);

export default AppRoutes;