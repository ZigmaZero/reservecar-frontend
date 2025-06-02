import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/checkin">Checkin</Link>
    <Link to="/checkout">Checkout</Link>
  </nav>
);

export default Navbar;