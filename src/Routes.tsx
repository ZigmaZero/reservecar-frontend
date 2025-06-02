import { Route, Routes } from 'react-router-dom';
import Checkin from './pages/Checkin';
import Checkout from './pages/Checkout';

const AppRoutes = () => (
  <Routes>
    <Route path="/checkin" element={<Checkin />} />
    <Route path="/checkout" element={<Checkout />}/>
  </Routes>
);

export default AppRoutes;