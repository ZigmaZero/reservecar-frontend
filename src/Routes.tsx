import { Route, Routes } from 'react-router-dom';
import Checkin from './pages/Checkin';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import CheckinSuccess from './pages/CheckinSuccess';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Register from './pages/Register';
import Login from './pages/Login';
import WaitForVerify from './pages/WaitForVerify';

const AppRoutes = () => (
  <Routes>
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/verify" element={<WaitForVerify />} />
    <Route path="/checkin" element={<Checkin />} />
    <Route path="/checkin-success" element={<CheckinSuccess />} />
    <Route path="/checkout" element={<Checkout />}/>
    <Route path="/checkout-success" element={<CheckoutSuccess />} />
    <Route path="/admin" element={<Home />}/>
    <Route path="/dashboard" element={<Dashboard />}/>
  </Routes>
);

export default AppRoutes;