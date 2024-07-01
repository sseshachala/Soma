import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonLoading,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useHistory, useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { useState } from 'react';
import { home, cart, settings, chevronDown, chevronUp } from 'ionicons/icons';
import axiosInstance from '../services/axiosService';
import { useAuth } from '../context/AuthContext';


const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();
  const history = useHistory();
  const [subMenuOpen, setSubMenuOpen] = useState<any>({
    products: false
  });

  const toggleSubMenu = (menuName: string) => {
    setSubMenuOpen({ ...subMenuOpen, [menuName]: !subMenuOpen[menuName] });
  };

  const isSubMenuOpened = (menuName: string) => {
    return subMenuOpen[menuName];
  };

  const location = useLocation();

  // Array of paths where the menu should be shown
  const showMenuOnPaths = ['/home', '/login', '/register', '/forgot', '/reset'];

  // Check if current path is in showMenuOnPaths array
  const showMenu = showMenuOnPaths.includes(location.pathname);

  if (showMenu) {
    return null; // Don't render menu if not on specified paths
  }
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const ret = await axiosInstance.post(`logout?token=${token}`);
      setIsLoading(false);
      if (ret?.message == 'Logged out successfully') {
        localStorage.removeItem('token');
        history.push('/login');
      }      
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      localStorage.removeItem('token');
      history.push('/login');
    }
  }


  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonListHeader>Inbox</IonListHeader>
        <IonNote>hi@ionicframework.com</IonNote>

        <IonMenuToggle autoHide={false}>
          <IonItem className={location.pathname === '/dashboard' ? 'selected' : ''} routerLink={'/dashboard'} routerDirection="none" lines="none" detail={false}>
            <IonIcon aria-hidden="true" slot="start" ios={cart} md={cart} />
            <IonLabel>{"Dashboard"}</IonLabel>
          </IonItem>
        </IonMenuToggle>

        <IonItem onClick={() => toggleSubMenu('products')}>
          <IonIcon slot="start" icon={cart} />
          <IonLabel>Projects</IonLabel>
          <IonIcon slot="end" icon={isSubMenuOpened('products') ? chevronUp : chevronDown} />
        </IonItem>

        {/* Submenu for Products */}
        {isSubMenuOpened('products') && (
          <IonList className='ml-3'>
            <IonMenuToggle auto-hide="false">
              <IonItem className={location.pathname === '/project/list' ? 'selected' : ''} routerLink={'/project/list'}>
                <IonIcon slot="start" icon={cart} />
                <IonLabel>List</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle auto-hide="false">
              <IonItem className={location.pathname === '/project/create' ? 'selected' : ''} routerLink={'/project/create'}>
                <IonIcon slot="start" icon={cart} />
                <IonLabel>Create</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        )}

        <IonItem onClick={() => toggleSubMenu('context')}>
          <IonIcon slot="start" icon={cart} />
          <IonLabel>Context</IonLabel>
          <IonIcon slot="end" icon={isSubMenuOpened('context') ? chevronUp : chevronDown} />
        </IonItem>

        {/* Submenu for Products */}
        {isSubMenuOpened('context') && (
          <IonList className='ml-3'>
            <IonMenuToggle auto-hide="false">
              <IonItem className={location.pathname === '/context/list' ? 'selected' : ''} routerLink={'/context/list'}>
                <IonIcon slot="start" icon={cart} />
                <IonLabel>List</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle auto-hide="false">
              <IonItem className={location.pathname === '/context/create' ? 'selected' : ''} routerLink={'/context/create'}>
                <IonIcon slot="start" icon={cart} />
                <IonLabel>Create</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        )}

        
        <IonItem onClick={() => toggleSubMenu('ingestion')}>
          <IonIcon slot="start" icon={cart} />
          <IonLabel>Data Ingestion</IonLabel>
          <IonIcon slot="end" icon={isSubMenuOpened('ingestion') ? chevronUp : chevronDown} />
        </IonItem>

        {/* Submenu for Products */}
        {isSubMenuOpened('ingestion') && (
          <IonList className='ml-3'>
            <IonMenuToggle auto-hide="false">
              <IonItem className={location.pathname === '/ingestion/list' ? 'selected' : ''} routerLink={'/ingestion/list'}>
                <IonIcon slot="start" icon={cart} />
                <IonLabel>Uploads</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle auto-hide="false">
              <IonItem className={location.pathname === '/ingestion/create' ? 'selected' : ''} routerLink={'/ingestion/create'}>
                <IonIcon slot="start" icon={cart} />
                <IonLabel>Youtube</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        )}

        <IonMenuToggle auto-hide="false">
          <IonItem>
            <IonIcon slot="start" icon={cart} />
            <IonLabel>AI PROCESSING</IonLabel>
          </IonItem>
        </IonMenuToggle>

        <IonMenuToggle auto-hide="false">
          <IonItem>
            <IonIcon slot="start" icon={cart} />
            <IonLabel>CONTEXT MANAGEMENT</IonLabel>
          </IonItem>
        </IonMenuToggle>

        <IonMenuToggle auto-hide="false">
          <IonItem>
            <IonIcon slot="start" icon={cart} />
            <IonLabel>CHAT Q & A</IonLabel>
          </IonItem>
        </IonMenuToggle>

        <IonMenuToggle auto-hide="false">
          <IonItem onClick={(e) => handleLogout()}>
            <IonIcon slot="start" icon={cart} />
            <IonLabel>LOG OUT</IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonContent>
      <IonLoading
        isOpen={isLoading}
        spinner={'circles'}
      >

      </IonLoading>
    </IonMenu>
  );
};

export default Menu;
