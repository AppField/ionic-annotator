import React, { useState } from "react";
import { IonList, IonItem, IonLabel, IonIcon, IonAlert } from "@ionic/react";
import { downloadOutline, trashOutline } from "ionicons/icons";
import { useAnnotateContext } from "../pages/AnnotatorManager";
import { downloadCsv } from "../utils/utils";
import { AnnotateData } from "../models/Data";

interface MenuPopoverProps {
  onClick: () => any;
}

const MenuPopover: React.FC<MenuPopoverProps> = ({ onClick }) => {
  const { data, setData } = useAnnotateContext();
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
      <IonAlert
        isOpen={showAlert}
        header="Daten wirklich löschen?"
        message="Die Daten werden unwiderruflich gelöscht."
        buttons={[
          {
            text: "Löschen",
            handler: () => {
              setData(new AnnotateData());
              onClick();
            },
          },
          {
            text: "Abbrechen",
            role: "cancel",
            handler: () => {
              onClick();
            },
          },
        ]}
      />

      <IonList>
        <IonItem
          button
          onClick={() => {
            downloadCsv(data.csv);
            onClick();
          }}
        >
          <IonIcon slot="start" icon={trashOutline} />
          <IonLabel>Herunterladen</IonLabel>
        </IonItem>
        <IonItem
          button
          onClick={() => {
            setShowAlert(true);
          }}
        >
          <IonIcon slot="start" icon={downloadOutline} />
          <IonLabel>Daten L&ouml;schen</IonLabel>
        </IonItem>
      </IonList>
    </>
  );
};

export default MenuPopover;
