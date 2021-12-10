import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react';

export type AuthType = {
	username: string;
	id: number;
	status: boolean;
};

const AuthenticationContainer = () => {
    const [authState, setAuthState] = useState<AuthType>({
		username: '',
		id: 0,
		status: false
	});

    const authenticate = async (): Promise<void> => {
        axios
			.get('http://localhost:3001/api/auth', {
				headers: {
					accessToken: localStorage.getItem('accessToken')!
				}
			})
			.then((response: AxiosResponse) => {
				if (response.data.error) {
					setAuthState({ ...authState, status: false });
				} else {
					setAuthState({
						username: response.data.username,
						id: response.data.user.id,
						status: true
					});
				}
			})
			.catch((error: AxiosError) => {
				console.log(error);
			});
    };

    return {
        authState,
        setAuthState,
        authenticate
    }
}

export default AuthenticationContainer;
