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
import { AxiosError } from "axios";

type LoginComponentProps = {
  setToken: (token: string) => void;
  setMessage?: (message: string) => void;
};

const LoginComponent = ({ setToken, setMessage }: LoginComponentProps) => {
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
  const handleLoginError = (error: AxiosError) => {
    let message = "";
    console.log("Error handler", error.message);
    if (error.message === "Network Error")
      message = "Błąd połaczenia. Spróbuj ponownie za 10s";
    if (error.code === "ERR_BAD_REQUEST")
      message = "Błędne dane logowania. Popraw je i spróbuj ponownie";
    if (setMessage && message !== "") setMessage(message);
    console.log(message, error);
  };

  const handleLogin = () => {
    try {
      login(credentials.name || "", credentials.token || "")
        .then((token) => {
          console.log("sucess login", token);
          setCredentials((prev) => ({ ...prev, token }));
          setToken(token);
          history.push("/");
        })
        .catch((error) => {
          handleLoginError(error.message as AxiosError);
        });
    } catch (error) {
      handleLoginError(error as AxiosError);
    }
  };

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
