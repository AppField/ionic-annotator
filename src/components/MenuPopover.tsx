import React, { useState } from "react";
import { IonList, IonItem, IonLabel, IonIcon, IonAlert } from "@ionic/react";
import { downloadOutline, trashOutline } from "ionicons/icons";
import { useAnnotateContext } from "../pages/AnnotatorManager";
import { jsonToCSV } from "react-papaparse";

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
            const csv = jsonToCSV(annotate);
            const csvBlob = new Blob([csv], {
              type: "text/csv;charset=utf-8;",
            });
            const csvUrl = window.URL.createObjectURL(csvBlob);
            const tempLink = document.createElement("a");
            tempLink.href = csvUrl;
            tempLink.setAttribute("download", "sentiments.csv");
            tempLink.click();
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
