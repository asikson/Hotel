import React from 'react';
import AuthProvider from './authorization/AuthProvider';
import ProtectedRoute from './authorization/ProtectedRoute';
import Login from './Login/components/Login';
import Home from './Home/components/Home';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import ErrorPage from './Login/components/ErrorPage';

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route
            path='Home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
  
}

export default App;