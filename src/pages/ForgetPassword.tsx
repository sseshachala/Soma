import React, { useState } from 'react';
import { IonButton, useIonToast , IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonInput, IonItem, IonLabel, IonPage, IonRow, IonText, IonToast, IonLoading } from '@ionic/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../services/axiosService';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgetPassword: React.FC = () => {

    const [isLoading, setIsLoading] = useState(false);

    const [present] = useIonToast();

    const history = useHistory();

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        console.log('Form data:', data);
        try {
            setIsLoading(true);
            const ret = await axiosInstance.post('forgot-password', data);
            setIsLoading(false);
            if (ret.message != undefined) {
                goToOtherPage('/reset')
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err);
            presentToast('top', err.response.data?.detail);
        }
    };

    const presentToast = (position: 'top' | 'middle' | 'bottom', message = '', color ='danger') => {
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
                        <div className="border border-gray-100 rounded-xl shadow-2xl p-8 bg-gradient-to-r from-gray-100 via-gray-100 to-gray-100  max-w-xs text-black">
                            <h1 className="text-2xl font-bold text-center">Forget Password</h1>

                            <p className="mb-3">Enter the email address associated with your account and we'll send you a link to reset your password.</p>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <IonLabel position="floating">Email</IonLabel>
                                    <div className='border border-gray-300 rounded-md px-2'>
                                        <IonInput type="text" clearInput {...register('email')} />
                                    </div>
                                </div>
                                {errors.email && <IonText color="danger">{errors.email.message}</IonText>}

                                <div className='flex justify-end'>
                                    <button className='text-xs mt-3' onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        goToOtherPage('/login');
                                    }}>Login</button>
                                </div>
                                <IonButton className='mt-3' type="submit" expand="block">Continue</IonButton>
                            </form>
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

export default ForgetPassword;