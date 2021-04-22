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
import React from "react";
import { Redirect, Route } from "react-router";
import LoginComponent from "./LoginComponent";
import RegistrationComponent from "./RegistrationComponent";

const UserComponent = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/users/login" component={LoginComponent} exact={true} />
        <Route
          path="/users/registration"
          component={RegistrationComponent}
          exact={true}
        />
        <Route
          path="/users"
          render={() => <Redirect to="/users/login" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="top">
        <IonTabButton tab="login" href="/users/login">
          <IonLabel>Login</IonLabel>
        </IonTabButton>
        <IonTabButton tab="registrartion" href="/users/registration">
          <IonLabel>registration</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
export default UserComponent;
