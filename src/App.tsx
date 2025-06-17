import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AppRoutes from './Routes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRoutes />
    </LocalizationProvider>
  );
};

export default App;