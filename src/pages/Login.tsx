import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonText, IonToast, useIonToast } from '@ionic/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import axiosInstance, { setAuthToken } from '../services/axiosService';
import { useAuth } from '../context/AuthContext';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const Login: React.FC = () => {

    const [present] = useIonToast();

    const [isLoading, setIsLoading] = useState(false);

    const { token, setToken } = useAuth();

    const history = useHistory();

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const ret = await axiosInstance.post('login/', data);
            setIsLoading(false);
            if (ret?.token != undefined) {
                setAuthToken(ret?.token);
                setToken(ret?.token);
                goToOtherPage('/dashboard');
            }

        } catch (err) {
            console.log(err);
            setIsLoading(false);
            presentToast('top', err.response.data.detail);
        }
    };

    const presentToast = (position: 'top' | 'middle' | 'bottom', message = '', color = 'danger') => {
        present({
            message: message,
            duration: 5000,
            position: position,
            color: color
        });
    };

    const goToOtherPage = (path: string) => {
        history.push(path); // Navigate to '/other' route
    };
    
    return (
        <IonPage>
            <IonContent className="relative" style={{ backgroundColor: '#f0f0f0' }}>
                <div className='w-full h-screen bg-black'>
                    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                        <div className="border border-gray-100 rounded-xl shadow-2xl p-8 bg-gradient-to-r from-gray-100 via-gray-100 to-gray-100  max-w-lg text-black">
                            <h1 className="text-2xl font-bold text-center">Sign In</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <div className='border border-gray-300 rounded-md px-2'>
                                        <IonInput type="text" clearInput {...register('email')} />
                                    </div>
                                </div>
                                {errors.email && <IonText color="danger">{errors.email.message}</IonText>}

                                <div className='mt-2'>
                                    <IonLabel position="floating">Password</IonLabel>
                                    <div className='border border-gray-300 rounded-md px-2'>
                                        <IonInput type="password" clearInput {...register('password')} />
                                    </div>
                                </div>
                                {errors.password && <IonText color="danger">{errors.password.message}</IonText>}

                                <div className='flex justify-end'>
                                    <button className='text-xs mt-3' onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        goToOtherPage('/forgot')
                                    }}>Forget password</button>
                                </div>
                                <IonButton className='mt-3' type="submit" expand="block">Login</IonButton>
                            </form>

                            <div className='flex justify-between'>
                                <div className='text-xs mt-3'>Don't have account?</div>
                                <button className='text-xs mt-3' onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    goToOtherPage('/register')
                                }}>Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
            <IonLoading
                isOpen={isLoading}
                spinner={'circles'}
            ></IonLoading>
        </IonPage>
    );
};

export default Login;