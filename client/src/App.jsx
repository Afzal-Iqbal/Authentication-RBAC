import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './layouts/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
  const { user, loading } = useAuth();
  if (loading) return null; // Or a global loader
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
