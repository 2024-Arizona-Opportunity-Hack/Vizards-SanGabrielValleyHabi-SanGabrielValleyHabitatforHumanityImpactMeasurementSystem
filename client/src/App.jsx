import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import Harsh from './components/Harsh';
import { useState } from 'react';
import { AuthProvider } from '../src/contexts/AuthContext';
import ProtectedRoute from '../src/routes/ProtectedRoutes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Aakash from 'components/Aakash';

export default function Main() {
  const theme = createTheme(); // You can customize this theme object
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ThemeProvider theme={theme}>
    <AuthProvider>
    <ChakraProvider theme={currentTheme}>
      <Routes>

      <Route path="harsh" element={<Harsh />} />
      <Route path="aakash" element={<Aakash />} />
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
  </ThemeProvider>
  );
}
