import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import ShopListsContainer from "./components/ShopLists/ShopListsContainer";
import { basketOutline } from "ionicons/icons";
import LoginComponent from "./components/Login/LoginComponent";
import UserComponent from "./components/Login/UserComponent";
import { useStorageItem } from "@capacitor-community/react-hooks/storage";
import RegistrationComponent from "./components/Login/RegistrationComponent";

const App: React.FC = () => {
  const [token, setToken] = useStorageItem("access_token");
  return (
    <IonApp>
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonTitle>
            <IonButton href="/">
              <IonIcon icon={basketOutline} size="large" />
            </IonButton>

            Listy zakupów
          </IonTitle>
          {token !== null ? (
            <IonButton
              onClick={() => {
                setToken(null);
              }}
            >
              logout
            </IonButton>
          ) : (
            <IonButton href="/users">login</IonButton>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/dashboard" component={ShopListsContainer} exact />
            <Route path="/users" component={UserComponent} exact />
          </IonRouterOutlet>
          {/* <UserComponent /> */}
          {/* <LoginComponent /> */}
          {/* {token ? <ShopListsContainer /> : <UserComponent />} */}
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
