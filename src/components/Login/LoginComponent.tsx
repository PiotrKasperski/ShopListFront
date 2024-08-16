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

type LoginComponentProps = { onToken: (token: string) => void };

const LoginComponent = ({ onToken }: LoginComponentProps) => {
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
      onToken(token);
      history.push("/");
    });

  return (
    <IonContent>
      <IonItem>
        <IonLabel>Username</IonLabel>
        <IonInput
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
        <IonLabel>Password</IonLabel>
        <IonInput
          type="password"
          ref={passwordInputRef}
          onIonChange={(e) =>
            setCredentials((prev) => ({ ...prev, token: e.detail.value! }))
          }
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
      </IonItem>
      <IonButton onClick={handleLogin}>Login</IonButton>
    </IonContent>
  );
};

export default LoginComponent;
