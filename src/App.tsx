import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ShopListsContainer from "./components/ShopLists/ShopListsContainer";
import UserComponent from "./components/Login/UserComponent";
import { StatusBar, StatusBarStyle } from "@capacitor/status-bar";
import { basketOutline } from "ionicons/icons";
import { useStorage, useStorageItem } from "@capacitor-community/storage-react";

setupIonicReact();

const App: React.FC = () => {
  const [token, setToken] = useStorageItem<string | null>("access_token");
  const { get } = useStorage();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeToken = async () => {
      const storedToken = await get("access_token");
      console.log("Initial token:", storedToken);
      if (storedToken) setToken(storedToken);
      setIsLoading(false);
    };

    if (StatusBar) {
      StatusBar.setStyle({
        style: StatusBarStyle.Dark,
      });
      StatusBar.setOverlaysWebView({ overlay: true }).catch(console.log);
      StatusBar.hide();
    }

    if (!token) initializeToken();
  }, []);

  useEffect(() => {
    console.log("Updated token:", token);
  }, [token]);

  const handleTokenUpdate = (newToken: string) => setToken(newToken);

  if (isLoading) return <div>Loading...</div>;

  return (
    <IonApp>
      <IonHeader color="primary">
        <IonToolbar color="primary">
          <IonIcon slot="start" icon={basketOutline} size="large" />
          <IonTitle>Shopping Lists</IonTitle>
          {token ? (
            <IonButton slot="end" onClick={() => setToken("")}>
              Wyloguj
            </IonButton>
          ) : (
            <IonButton slot="end" href="/users">
              Zaloguj
            </IonButton>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/dashboard">
              <PrivateRoute token={token || ""}>
                <ShopListsContainer />
              </PrivateRoute>
            </Route>
            <Route path="/users">
              <UserComponent onToken={handleTokenUpdate} />
            </Route>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonContent>
    </IonApp>
  );
};

export default App;
