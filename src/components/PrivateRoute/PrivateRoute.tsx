import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { IonToast } from "@ionic/react";

type Props = {
  children?: React.ReactNode;
  token: string;
  onRedirect?: () => void;
  setMessage?: (message: string) => void;
};

const PrivateRoute: React.FC<Props> = ({
  children,
  token,
  onRedirect,
  setMessage,
}) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!token || token === null) {
      setShowToast(true);
      if (onRedirect) {
        onRedirect();
        console.log("onRedirect");
      }
      if (setMessage) setMessage("Przed skorzystaniem należy się zalogować");
    }
  }, [token, onRedirect]);

  return (
    <>
      {showToast && (
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message=""
          duration={2000}
        />
      )}
      {!!token || token === "null" ? <>{children}</> : <Redirect to="/users" />}
    </>
  );
};

export default PrivateRoute;
