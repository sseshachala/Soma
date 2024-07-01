import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonText, useIonToast } from '@ionic/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import axiosInstance, { setAuthToken } from '../services/axiosService';
import { useAuth } from '../context/AuthContext';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    new_password: yup.string().required('Password is required'),
});

const ResetPassword: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [present] = useIonToast();

    const history = useHistory();

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const ret = await axiosInstance.post('reset-password/', data);
            setIsLoading(false);
            if (ret?.message != undefined) {
                goToOtherPage('/login');
            }

        } catch (err) {
            console.log(err);
            setIsLoading(false);
            presentToast('top', err.response.data?.detail);
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
                            <h1 className="text-2xl font-bold text-center">Reset Password</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <div className='border border-gray-300 rounded-md px-2'>
                                        <IonInput type="text" clearInput {...register('email')} />
                                    </div>
                                </div>
                                {errors.email && <IonText color="danger">{errors.email.message}</IonText>}

                                <div className='mt-2'>
                                    <IonLabel position="floating">New Password</IonLabel>
                                    <div className='border border-gray-300 rounded-md px-2'>
                                        <IonInput type="password" clearInput {...register('new_password')} />
                                    </div>
                                </div>
                                {errors.new_password && <IonText color="danger">{errors.new_password.message}</IonText>}

                                <IonButton className='mt-3' type="submit" expand="block">Reset Password</IonButton>
                            </form>

                            <div className='flex justify-between'>
                                <button className='text-xs mt-3' onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    goToOtherPage('/register')
                                }}>Sign up</button>
                            </div>
                        </div>
                    </div>
                </div>
                <IonLoading
                    isOpen={isLoading}
                    spinner={'circles'}
                ></IonLoading>
            </IonContent>
        </IonPage>
    );
};

export default ResetPassword;