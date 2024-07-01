import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Menu from './components/Menu';
import Page from './pages/Page';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/tailwind.css';
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { createAnimation } from '@ionic/react';
import { useRef } from 'react';
import Dashboard from './pages/Client/Dashboard';
import ForgetPassword from './pages/ForgetPassword';
import ProjectList from './pages/Client/Project/List';
import ProjectCreate from './pages/Client/Project/Create';
import DataIngestionList from './pages/Client/DataIngestion/List';
import DataIngestionCreate from './pages/Client/DataIngestion/Create';
import ContextList from './pages/Client/Context/List';
import ContextCreate from './pages/Client/Context/Create';
import { AuthProvider } from './context/AuthContext';
import ResetPassword from './pages/ResetPassword';
setupIonicReact();

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <AuthProvider>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet id="main">
              <Switch>
                <Route path="/" exact={true}>
                  <Redirect to="/login" />
                </Route>
                <Route path="/login" exact={true}>
                  <Login />
                </Route>
                <Route path="/register" exact={true}>
                  <Register />
                </Route>
                <Route path="/forgot" exact={true}>
                  <ForgetPassword />
                </Route>
                <Route path="/reset" exact={true}>
                  <ResetPassword/>
                </Route>
                <Route path="/dashboard" exact={true}>
                  <Dashboard />
                </Route>

                <Route path="/project/list" exact={true}>
                  <ProjectList />
                </Route>
                <Route path="/project/create" exact={true}>
                  <ProjectCreate />
                </Route>

                <Route path="/context/list" exact={true}>
                  <ContextList />
                </Route>
                <Route path="/context/create" exact={true}>
                  <ContextCreate />
                </Route>

                <Route path="/ingestion/list" exact={true}>
                  <DataIngestionList />
                </Route>
                <Route path="/ingestion/create" exact={true}>
                  <DataIngestionCreate />
                </Route>

              </Switch>
              <Route path="/folder/:name" exact={true}>
                <Page />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </AuthProvider>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
