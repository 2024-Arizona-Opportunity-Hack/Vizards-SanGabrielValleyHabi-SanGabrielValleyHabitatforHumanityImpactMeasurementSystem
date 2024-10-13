import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';
import { AuthProvider } from '../src/contexts/AuthContext';
import ProtectedRoute from '../src/routes/ProtectedRoutes';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <AuthProvider>
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path="admin/*"
            element={
              <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
            }
          />
          <Route
            path="rtl/*"
            element={
              <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
            }
          />
          <Route path="/" element={<Navigate to="/admin" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </ChakraProvider>
  </AuthProvider>
  );
}
