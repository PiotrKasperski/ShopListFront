import { IonButton, IonContent, IonFab, IonFabButton, IonIcon, IonInput, IonItem, IonLabel, IonModal, IonPage } from "@ionic/react"
import { add } from "ionicons/icons"
import { on } from "process";
import React, { useEffect, useState } from "react"
interface Props{
    onAddListClick: (string: string)=>void
}

const AddShopListFab = (props:Props)=>{
    const[isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newShopListName, setNewShopListName] =useState('')
    useEffect(()=>{
        setIsModalOpen(false);
    })
    const changeShowModal = (isOpen:boolean) =>{
            setIsModalOpen(isOpen)
    }
    const handleAddListClick = ()=>{
        props.onAddListClick(newShopListName);
        setShowModal(false);
        setNewShopListName('');
    }
    return (
    <div>
        <IonFab vertical="bottom" horizontal='end'>
        <IonFabButton onClick={()=>{setShowModal(true)}}>
            <IonIcon icon={add}/>
        </IonFabButton>

      <IonModal isOpen={showModal} cssClass='my-custom-class'>
          <IonPage>
              <IonItem>
                   <IonLabel>Nazwa nowej listy: </IonLabel><IonInput value={newShopListName} placeholder='Nazwa nowej listy' onIonChange={e=>{setNewShopListName(e.detail.value!)}}/>
          </IonItem>
                <IonButton onClick={() => handleAddListClick()}>Dodaj liste</IonButton> 
          </IonPage>
     
      </IonModal>
    </IonFab>
    </div>
    
      
    )
}

export default AddShopListFab;