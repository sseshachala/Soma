import { IonBreadcrumb, IonBreadcrumbs, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { useParams } from 'react-router';

const ContextList: React.FC = () => {

  const { name } = useParams<{ name: string; }>();
  const [data, setData] = useState(['One', 'Two', 'Three', 'four', 'five']);

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

      <IonContent fullscreen className='container'>
        <div className='container p-5'>
          <IonBreadcrumbs>
            <IonBreadcrumb >Context</IonBreadcrumb>
            <IonBreadcrumb >List</IonBreadcrumb>
          </IonBreadcrumbs>
          <div>
            <IonGrid>
              <IonRow>
                {data.map((item, index) => (
                  <IonCol size='4' sizeMd='4' sizeSm='6' sizeXs='12' key={index}>
                    <IonCard>
                      <IonCardHeader>
                        <IonCardTitle>Card Title</IonCardTitle>
                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                      </IonCardHeader>

                      <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ContextList;
