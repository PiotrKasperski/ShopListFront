import {
  IonBadge,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToast,
} from "@ionic/react";
import { type } from "os";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";
type UserComponentProps = {
  onToken: (token: string) => void;
  setMessage?: (message: string) => void;
};
const UserComponent = ({ onToken, setMessage }: UserComponentProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  if (typeof onToken !== "function") {
    throw new Error("setToken must be a function");
  }
  useEffect(() => {
    onToken(token ? token : "");

    console.log("on token");
  }, [token]);
  const handleLogin = (token: string) => {
    onToken(token);
    if (setMessage) setMessage("Pomyślne logowanie");
  };
  const handleRegistry = (token: string) => {
    onToken(token);
    if (setMessage) setMessage("Pomyślna rejestracja");
  };

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/users/login">
          <LoginComponent setToken={handleLogin} setMessage={setMessage} />
        </Route>
        <Route path="/users/registration">
          <RegistrationComponent onToken={onToken} />
        </Route>
        <Route
          path="/users"
          render={() => <Redirect to="/users/login" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="top">
        <IonTabButton tab="login" href="/users/login">
          <IonLabel>Logowanie</IonLabel>
        </IonTabButton>
        <IonTabButton tab="registrartion" href="/users/registration">
          <IonLabel>Rejestracja</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default UserComponent;
