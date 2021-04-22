import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import UserModel from "../../models/UserModel";
import {useHistory} from "react-router";
import useAuth from "../../hooks/useAuth";

const RegistrationComponent = () => {
    const [user, setUser] = useState<UserModel>({
        name: null,
        userID: null,
        token: null,
    });
    const history = useHistory();
    const { login, register } = useAuth();
    const makeRegistration = ()=>{
        register(user.name||"",user.token||"").then(
            (token)=>{
                setUser({
                    name: user.name,
                    token: token,
                    userID: user.userID,
                })
                history.push("/")
            }
        )
    }
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

                    }}
                >
                    Login
                </IonButton>
            </IonItem>
        </IonContent>
    );
};
export default RegistrationComponent;
