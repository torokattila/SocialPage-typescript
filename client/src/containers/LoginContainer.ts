import { useState, useContext} from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

type LoginDataType = {
    username: string;
    password: string;
}

const LoginContainer = () => {
    const [loginUsername, setLoginUsername] = useState<string>('');
    const [loginPassword, setLoginPassword] = useState<string>('');
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const [isPassword, setIsPassword] = useState<boolean>(true);

    const { setAuthState } = useContext(AuthContext);
    const history = useHistory();

    const togglePasswordIcon = (): void => {
        setHidePassword(!hidePassword);
        setIsPassword(!isPassword);
    }

    const handleLogin = (): void => {
        const data: LoginDataType = {
            username: loginUsername,
            password: loginPassword,
        };

        axios.post('http://localhost:3001/api/login', data).then((response: AxiosResponse) => {
            if (response.data.error) {
                toast.error(response.data.error, { theme: 'colored'});
            } else {
                localStorage.setItem('accessToken', response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                });
                history.push('/');
            }
        })
        .catch((error: AxiosError) => {
            console.log(error);
        });
    };
    
    return {
        loginUsername,
        loginPassword,
        setLoginUsername,
        setLoginPassword,
        handleLogin,
        hidePassword,
        isPassword,
        setIsPassword,
        togglePasswordIcon,
    }
};

export default LoginContainer;