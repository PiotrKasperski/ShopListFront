import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
} from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useState } from "react";

interface Props {
  onAddListClick: (listName: string) => void;
}

const AddShopListFab: React.FC<Props> = ({ onAddListClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newShopListName, setNewShopListName] = useState("");

  const handleAddListClick = () => {
    if (newShopListName.trim()) {
      onAddListClick(newShopListName);
      setIsModalOpen(false);
      setNewShopListName("");
    }
  };

  return (
    <div>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          data-testid="open-modal-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonPage>
          <IonItem>
            <IonLabel>Nazwa nowej listy:</IonLabel>
            <IonInput
              data-testid="shoplist-input"
              value={newShopListName}
              placeholder="Wprowadź nazwę"
              onIonChange={(e) => setNewShopListName(e.detail.value!)}
            />
          </IonItem>
          <IonButton data-testid="add-list-btn" onClick={handleAddListClick}>
            Dodaj listę
          </IonButton>
        </IonPage>
      </IonModal>
    </div>
  );
};

export default AddShopListFab;
