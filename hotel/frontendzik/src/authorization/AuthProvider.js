import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { fakeAuth } from '../Login/utils/loginUtils';
import { AuthContext} from './useAuth';

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
  
    const handleLogin = async () => {
      const token = await fakeAuth();
      setToken(token);

      navigate('home');
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