import { Outlet, Route, Routes } from 'react-router-dom';
import Checkin from './pages/Checkin';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import CheckinSuccess from './pages/CheckinSuccess';
import CheckoutSuccess from './pages/CheckoutSuccess';
import Register from './pages/Register';
import Login from './pages/Login';
import WaitForVerify from './pages/WaitForVerify';
import Menu from './pages/Menu';
import { UserProvider } from './contexts/UserContext';
import { AdminProvider } from './contexts/AdminContext';
import NotFound from './pages/errors/NotFound';
import Forbidden from './pages/errors/Forbidden';
import LineLogin from './pages/LineLogin';
import LineLoginBegin from './pages/LineLoginBegin';
import LineLoginCallback from './pages/LineLoginCallback';

// Layouts for providers
const UserLayout = () => (
  <UserProvider>
    <Outlet />
  </UserProvider>
);

const AdminLayout = () => (
  <AdminProvider>
    <Outlet />
  </AdminProvider>
);

const AppRoutes = () => (
  <Routes>
    {/* User routes */}
    <Route element={<UserLayout />}>
      <Route path="/line/access" element={<LineLogin/>} />
      <Route path="/line/begin" element={<LineLoginBegin />}/>
      <Route path="/line/callback" element={<LineLoginCallback />}/>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify" element={<WaitForVerify />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/checkin" element={<Checkin />} />
      <Route path="/checkin-success" element={<CheckinSuccess />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
    </Route>

    {/* Admin routes */}
    <Route element={<AdminLayout />}>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/*" element={<Forbidden />} />
    </Route>

    {/* Not found */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;