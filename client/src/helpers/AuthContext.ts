import React, { createContext } from 'react';
import { AuthType } from '../containers/AuthenticationContainer';

const authState = {
	username: '',
	id: 0,
	status: false
};
const setAuthState = () => {};

type ContextType = {
	authState: AuthType;
	setAuthState: React.Dispatch<React.SetStateAction<AuthType>>;
};

export const AuthContext: React.Context<ContextType> = createContext<
	ContextType
>({ authState, setAuthState });
