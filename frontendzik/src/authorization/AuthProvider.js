import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AuthContext} from './useAuth';
import { logIn } from '../utils/api';

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
  
    const handleLogin = async (login, password) => {
      if (login != '' && password != '') {
        logIn(login, password).then(response => {
          if (Array.isArray(response.data)) {
            const data = response.data[0];
            if ('id_worker' in data) {
              setUserData(data);
              navigate('home');
            }
          }
        });
      }
    };
  
    const handleLogout = () => {
      setUserData(null);
    };
  
    const value = {
      userData,
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