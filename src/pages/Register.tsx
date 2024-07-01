import React, { useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonRow, IonText, useIonToast } from '@ionic/react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../services/axiosService';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
    password_confirmation: yup.string(),
});

const Register: React.FC = () => {

    const [present] = useIonToast();

    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const { handleSubmit, register, formState: { errors } } = useForm({
        defaultValues: {
            // description: item?.description || "",
            email: '',
            password: '',
            password_confirmation: '',
        },
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        console.log('Form data:', data);
        // Handle form submission logic (e.g., API call)
        try {
            setIsLoading(true);
            const ret = await axiosInstance.post('register', data);
            setIsLoading(false);
            if (ret?.user != undefined) {
                goToOtherPage('/login')   
            }
        } catch (err) {
            setIsLoading(false);
            console.log(err);
            presentToast('top', err.response.data.detail);
        }
    };

    const goToOtherPage = (path: string) => {
        history.push(path); // Navigate to '/other' route
    };

    const presentToast = (position: 'top' | 'middle' | 'bottom', message = '', color = 'danger') => {
        present({
            position: position,
            message: message,
            duration: 5000,
            color: color
        })
    };

    return (
        <IonPage>
            <IonContent className="relative" style={{ backgroundColor: '#f0f0f0' }}>
                <div className='w-full h-screen bg-dark'>
                    <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-center items-center">
                        <div className="border border-gray-100 rounded-xl shadow-2xl p-8 bg-gradient-to-r from-gray-100 via-gray-100 to-gray-100  max-w-lg text-black">
                            <h1 className="text-2xl font-bold text-center">Sign Up</h1>
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
                                        <IonInput type="text" clearInput {...register('password')} />
                                    </div>
                                </div>
                                {errors.password && <IonText color="danger">{errors.password.message}</IonText>}

                                <div className='mt-2'>
                                    <IonLabel position="floating">Confirmation Password</IonLabel>
                                    <div className='border border-gray-300 rounded-md px-2'>
                                        <IonInput type="text" clearInput {...register('password_confirmation')} />
                                    </div>
                                </div>

                                <IonButton className='mt-3' type="submit" expand="block">Sign up</IonButton>
                            </form>

                            <div className='flex justify-between'>
                                <IonText className='text-xs mt-3'>Do you have account?</IonText>
                                <button className='text-xs mt-3' onClick={(e) => {
                                    goToOtherPage('/login');
                                }}>Log in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
            <IonLoading
                isOpen={isLoading}
                message={''}
                spinner={'circles'}
            ></IonLoading>
        </IonPage>
    );
};

export default Register;