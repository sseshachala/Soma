import React, { createContext, useContext, useState } from 'react';

const AuthContent = createContext({
	user: null,
	setUser: ({ }: any) => { },
	token: null,
	setToken: ({ }: any) => { },
});

export const AuthProvider = ({ children }: any) => {

	const [user, _setUser] = useState<any>(() => {
		const storedUser = localStorage.getItem('user');
		if (storedUser) {
			try {
				return JSON.parse(storedUser);
			} catch (error) {
				console.error('Error parsing user data from localStorage:', error);
			}
		}
		return null;
	});

	const [token, _setToken] = useState<any>(() => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			try {
				return storedToken;
			} catch (error) {
				console.error('Error parsing user data from localStorage:', error);
			}
		}
		return 'test123';
	});

	const setToken = (token: string) => {
		if (token) {
			console.log('set token to local storage');
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
		}
		_setToken(token);
	};
	// set user to local storage
	const setUser = (user: any) => {
		if (user) {
			console.log('set user to local storage');
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
		_setUser(user);
	};

	return (
		<AuthContent.Provider value={{ user, setUser, token, setToken}}>
			{children}
		</AuthContent.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContent);
};