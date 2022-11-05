import * as React from 'react';
import {Routes, Route, NavLink, Navigate, useNavigate, useLocation, BrowserRouter} from 'react-router-dom';

const fakeAuth = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = React.useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();

    setToken(token);

    const origin = location.state?.from?.pathname || '/dashboard';
    navigate(origin);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  return children;
};

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>

      <Navigation />

      <Routes>
        <Route index element={<Home />} />
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
};

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