import { useStorageItem } from "@capacitor-community/react-hooks/storage";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import useApi from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";
import UserModel from "../../models/UserModel";

type LoginComponentProps = { onToken: (token: string) => void };
const LoginComponent = ({ onToken }: LoginComponentProps) => {
  const [user, setUser] = useState<UserModel>({
    name: null,
    userID: null,
    token: null,
  });
  const history = useHistory();
  const { login } = useAuth();
  const logine = () => {
    login(user.name || "", user.token || "").then((response) => {
      setUser({
        name: user.name,
        userID: user.userID,
        token: response,
      });
      onToken(response);
      history.push("/");
    });
  };
  return (
    <IonContent>
      <IonItem>
        <IonLabel>Nazwa użytkownika</IonLabel>
        <IonInput
          type="text"
          onIonChange={(e) => {
            setUser({
              name: e.detail.value!,
              token: user.token,
              userID: user.userID,
            });
          }}
        />
      </IonItem>
      <IonItem>
        <IonLabel>Hasło</IonLabel>
        <IonInput
          type="password"
          onIonChange={(e) => {
            setUser({
              name: user.name,
              token: e.detail.value!,
              userID: user.userID,
            });
          }}
        />
      </IonItem>
      <IonItem>
        <IonButton
          onClick={() => {
            logine();
          }}
        >
          Login
        </IonButton>
      </IonItem>
    </IonContent>
  );
};
export default LoginComponent;
