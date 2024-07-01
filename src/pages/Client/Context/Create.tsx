import { IonBreadcrumb, IonBreadcrumbs, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItemOption, IonMenuButton, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DropFileInput from '../../../components/DropFileInput'

const validationSchema = yup.object().shape({
  name: yup.string().required('Project Name is required'),
  description: yup.string(),
});

const ContextCreate: React.FC = () => {
  const history = useHistory();

  const { name } = useParams<{ name: string; }>();
  const [contexts, setContexts] = useState(['One', 'Two', 'Three', 'four', 'five', 'Three', 'four', 'five']);

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Form data:', data);
    goToOtherPage('/project/list')
  };

  const onFileChange = (files: any) => {
    console.log(files);
  }
  const goToOtherPage = (path: string) => {
    history.push(path); // Navigate to '/other' route
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Context</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen >
        <div className='p-5'>
          <IonBreadcrumbs>
            <IonBreadcrumb >Context</IonBreadcrumb>
            <IonBreadcrumb >Create</IonBreadcrumb>
          </IonBreadcrumbs>
          <div className='flex justify-center'>
            <div className='container px-6 py-6 bg-slate-800 rounded-lg sm:w-full md:w-[60%] lg:w-[40%] lg:mt-6 mt-3'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>

                  <IonInput
                    type="text"
                    fill="outline"
                    label="Name"
                    labelPlacement="floating"
                    {...register('name')}
                  ></IonInput>
                  {errors.name && <p className='text-xs text-red-600 mt-1'>{ errors.name.message}</p>}
                </div>

                <div className='mt-6'>
                  <IonTextarea rows={6} labelPlacement='floating' fill='outline' label="Description" { ...register('description')}></IonTextarea>
                  {errors.description && <p className='text-xs text-red-600 mt-1'>{errors.description.message}</p>}
                </div>
                
                <DropFileInput
                  onFileChange={(files) => onFileChange(files)}
                />
                <div className='flex justify-end'>
                  <IonButton className='mt-6' type='submit'>Save</IonButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ContextCreate;
