import { useState } from 'react';
import styles from '../styles/loginStyles.js';
import commonStyles from '../../styles/commonStyles.js';
import Input from './Input';
import { useAuth } from '../../authorization/useAuth';

const Login = () => {
    const { onLogin } = useAuth();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div style={commonStyles.page}>
            <div style={styles.container}>
                <div style={commonStyles.spaceEvenlycolumn}>
                    <label style={styles.header}>Zaloguj się</label>
                    <Input label='Login' value={login} setValue={setLogin}/>
                    <Input label='Hasło' value={password} setValue={setPassword} ifPassword={true}/>
                    <button style={commonStyles.OkButton} onClick={() => onLogin(login, password)}>OK</button>
                </div>
            </div>
        </div>
    )
}

export default Login;