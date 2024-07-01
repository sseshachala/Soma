// src/components/CustomLayout.tsx

import React, { useEffect } from 'react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { useAuth } from '../context/AuthContext';
import { useHistory } from 'react-router';
import axiosInstance, { setAuthToken } from '../services/axiosService';

const AuthLayout: React.FC<any> = ({ children }) => {

    const history = useHistory();

    const { user, token } = useAuth();
    console.log('token', token);
    setAuthToken(token);
    if (token == undefined) {
        // navigate to login page
        
        history.push('/login');
    }
    return (
        <div>
            {children}
        </div>
    )
};

export default AuthLayout;
