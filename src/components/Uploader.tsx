import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import { CSVReader } from "react-papaparse";
import { useAnnotateContext } from "../pages/AnnotatorManager";

const Uploader: React.FC = () => {
  const { setAnnotate } = useAnnotateContext();

  const [csv, setCsv] = useState<any[]>([]);

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>CSV Hochladen</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="ion-margin">
          <CSVReader
            onDrop={(csv: any) => {
              setCsv(csv);
            }}
          >
            <span>Drag'n Drop oder klicken zum Hochladen</span>
          </CSVReader>
        </div>

        {csv.length > 0 && (
          <IonButton
            class="ion-margin ion-float-right"
            onClick={() => {
              const copy = csv.map((c: { data: any[] }) => c.data) as any[];
              if (copy[copy.length - 1].length !== 8) {
                copy.pop();
              }

              setAnnotate(copy);
            }}
          >
            CSV verwenden
          </IonButton>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default Uploader;
