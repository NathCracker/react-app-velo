import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contacts';
import Apply from './pages/applicationform';
import AdminLogin from './pages/adminlogin';
import Dashboard from './pages/dashboard';

import Navbar from './components/navbar';
import Footer from './components/footer';
import ProtectedRoute from './components/ProtectedRoute';
import ChatWidget from './components/ChatWidget';

// Animations + conditional rendering of navbar/footer/chat
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = () => {
  const location = useLocation();

  // Hide navbar/footer/chat on admin & dashboard pages
  const hideChatOnRoutes = ['/admin', '/dashboard'];
  const shouldShowPublicUI = !hideChatOnRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowPublicUI && <Navbar />}
      <AnimatedRoutes />
      {shouldShowPublicUI && <Footer />}
      {shouldShowPublicUI && <ChatWidget />}
    </>
  );
};

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <AppContent />
      </Router>
    </LocalizationProvider>
  );
}

export default App;
