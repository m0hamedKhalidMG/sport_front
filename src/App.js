import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SportPage from './pages/SportPage';
import TrainerPage from './pages/TrainerPage';
import BookingPage from './pages/BookingPage';
import TrainersListPage from './pages/TrainersListPage';
import SportsListPage from './pages/SportsListPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './context/AuthContext';
import TrainerManagementPage from './pages/TrainerManagementPage';
import { TrainerProvider } from './context/TrainerContext'; 
const App = () => (
  <TrainerProvider>
  <AuthProvider>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports" element={<SportsListPage />} />
          <Route path="/trainers" element={<TrainersListPage />} />
          <Route path="/sport/:sportId" element={<SportPage />} />
          <Route path="/trainer/:trainerId" element={<TrainerPage />} />
          <Route path="/booking/:trainerId" element={<BookingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* New Route */}
          <Route path="/register" element={<RegisterPage />} />{' '}
          <Route path="/dashboard" element={<DashboardPage />} />{' '}
          <Route path="*" element={<ErrorPage />} />
          <Route path="/manage-trainers" element={<TrainerManagementPage />} />
        </Routes>
      </Layout>
    </Router>
  </AuthProvider>
  </TrainerProvider>
);

export default App;
