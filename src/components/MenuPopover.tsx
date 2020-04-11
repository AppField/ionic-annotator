import React, { useState } from "react";
import { IonList, IonItem, IonLabel, IonIcon, IonAlert } from "@ionic/react";
import { downloadOutline, trashOutline } from "ionicons/icons";
import { useAnnotateContext } from "../pages/AnnotatorManager";
import { downloadCsv } from "../utils/utils";

const MenuPopover: React.FC = () => {
  const { annotate, setAnnotate } = useAnnotateContext();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header="Daten wirklich löschen?"
        message="Die Daten werden unwiderruflich gelöscht."
        buttons={[
          {
            text: "Löschen",
            handler: () => {
              setAnnotate([]);
            },
          },
          {
            text: "Abbrechen",
            role: "cancel",
          },
        ]}
      />

      <IonList>
        <IonItem
          button
          onClick={() => {
            downloadCsv(annotate);
          }}
        >
          <IonIcon slot="start" icon={trashOutline} />
          <IonLabel>Herunterladen</IonLabel>
        </IonItem>
        <IonItem button onClick={() => setShowAlert(true)}>
          <IonIcon slot="start" icon={downloadOutline} />
          <IonLabel>Daten L&ouml;schen</IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default MenuPopover;

//setAnnotate([])
