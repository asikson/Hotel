import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fakeAuth } from '../utils/loginUtils';
import { AuthContext} from '../utils/useAuth';

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
  
    const handleLogin = async () => {
      const token = await fakeAuth();
      setToken(token);

      navigate('dashboard');
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

  export default AuthProvider;