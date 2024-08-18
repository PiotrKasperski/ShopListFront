import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import useAuth from "../../hooks/useAuth";
import UserModel from "../../models/UserModel";
import {
  useStorageItem,
  availableFeatures,
} from "@capacitor-community/storage-react";
import "./LoginComponent.css";

type LoginComponentProps = { setToken: (token: string) => void };

const LoginComponent = ({ setToken }: LoginComponentProps) => {
  if (typeof setToken !== "function") {
    throw new Error("setToken must be a function");
  }
  const [credentials, setCredentials] = useState<UserModel>({
    name: null,
    userID: null,
    token: null,
  });
  const history = useHistory();
  const { login } = useAuth();
  const passwordInputRef = useRef<HTMLIonInputElement>(null);

  const handleLogin = () =>
    login(credentials.name || "", credentials.token || "").then((token) => {
      setCredentials((prev) => ({ ...prev, token }));
      setToken(token);
      history.push("/");
    });

  return (
    <IonContent>
      <IonItem>
        <IonLabel class="padding_right">Username</IonLabel>
        <IonInput
          data-testid="username-input"
          type="text"
          onIonChange={(e) =>
            setCredentials((prev) => ({ ...prev, name: e.detail.value! }))
          }
          onKeyDown={(e) =>
            e.key === "Enter" && passwordInputRef.current?.setFocus()
          }
        />
      </IonItem>
      <IonItem>
        <IonLabel class="padding_right">Password</IonLabel>
        <IonInput
          data-testid="password-input"
          type="password"
          ref={passwordInputRef}
          onIonChange={(e) =>
            setCredentials((prev) => ({ ...prev, token: e.detail.value! }))
          }
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </IonItem>
      <IonButton onClick={handleLogin}>Zaloguj</IonButton>
    </IonContent>
  );
};

export default LoginComponent;
