import { useContext, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

type RegistrationDataType = {
    username: string;
    password: string;
}

const RegistrationContainer = () => {
    const [registrationUsername, setRegistrationUsername] = useState<string>('');
    const [registrationPassword, setRegistrationPassword] = useState<string>('');
    
    const { setAuthState } = useContext(AuthContext);
    const history = useHistory();

    const handleSignup = async (data: RegistrationDataType): Promise<void> => {
        await axios.post('http://localhost:3001/api/register', data)
        .then((response: AxiosResponse) => {
            if (response.data.error) {
                toast.error(response.data.error, { theme: 'colored' });
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
        .catch((error: any) => {
            toast.error(error.response.data.error, { theme: 'colored'});
        })
    };

    return {
        registrationUsername,
        registrationPassword,
        setRegistrationUsername,
        setRegistrationPassword,
        handleSignup,
    }
}

export default RegistrationContainer;