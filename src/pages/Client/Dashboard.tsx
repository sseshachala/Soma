import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import AuthLayout from '../../layout/AuthLayout';

const Dashboard: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  return (
    <AuthLayout>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>{name}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className='container p-2'>
          <div className='container p-5'>
            <IonTitle size='large'>Dashboard</IonTitle>
          </div>
        </IonContent>
      </IonPage>
    </AuthLayout>
  );
};

export default Dashboard;
