import React from "react";
import { IonList, IonItem, IonLabel, IonIcon } from "@ionic/react";
import { downloadOutline, trashOutline } from "ionicons/icons";

const MenuPopover: React.FC = () => (
  <IonList>
    <IonItem button>
      <IonIcon slot="start" icon={trashOutline} />
      <IonLabel>Herunterladen</IonLabel>
    </IonItem>
    <IonItem button>
      <IonIcon slot="start" icon={downloadOutline} />
      <IonLabel>Daten L&ouml;schen</IonLabel>
    </IonItem>
  </IonList>
);

export default MenuPopover;

//setAnnotate([])
