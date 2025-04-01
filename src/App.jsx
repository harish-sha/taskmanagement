import { AuthProvider } from './context/AuthContext';
import GlobalToaster from './components/common/GlobalToaster';
import AppRoutes from './routes/AppRoutes';

const App = () => (
  <AuthProvider>
    <GlobalToaster />
    <AppRoutes />
  </AuthProvider>
);

export default App

