import {
  IonBadge,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { type } from "os";
import React from "react";
import { Redirect, Route } from "react-router";
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";
type UserComponentProps = { onToken: (token: string) => void };
const UserComponent = ({ onToken }: UserComponentProps) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/users/login">
          <LoginComponent onToken={onToken} />
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
