import AppRoutes from './Routes';
import Navbar from './widgets/Navbar';
import './App.css'

const App = () => {
  return (
    <div>
      <h1>Jastel Car Reservation Form</h1>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;