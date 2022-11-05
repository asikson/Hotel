import React from 'react';
import Login from './components/Login';
import AuthProvider from './components/AuthProvider';
import {useAuth} from './utils/useAuth';

import {Routes, Route, NavLink, Navigate, useLocation, BrowserRouter} from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />

        <Routes>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
  
}

const Navigation = () => {
  const { token, onLogout } = useAuth();

  return (
    <nav>
      <br />
      <NavLink to="/home">Home</NavLink>
      <br />
      <NavLink to="/dashboard">Dashboard</NavLink>
      <br />
      <NavLink to="/admin">Admin</NavLink>
      <br />


      {token && (
        <button type="button" onClick={onLogout}>
          Wyloguj się
        </button>
      )}
    </nav>
  );
};

const Home = () => {
  const { onLogin } = useAuth();

  return (
    <>
      <h2>Home (Public)</h2>

      <button type="button" onClick={onLogin}>
        Zaloguj się
      </button>
    </>
  );
};

const Dashboard = () => {
  const { token } = useAuth();

  return (
    <>
      <h2>Dashboard (Protected)</h2>

      <div>Witaj as {token}</div>
    </>
  );
};

const Admin = () => {
  return (
    <>
      <h2>Admin (Protected)</h2>
    </>
  );
};

const NoMatch = () => {
  return <p>Błąd: 404!</p>;
};

export default App;