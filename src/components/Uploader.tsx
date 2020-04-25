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
import { AnnotateData } from "../Models/Data";

const Uploader: React.FC = () => {
  const { setData } = useAnnotateContext();

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
              setData(prepareAnnotateData(csv));
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

const prepareAnnotateData = (uploadedCsv: any[]): AnnotateData => {
  const copy = uploadedCsv.map((c: { data: any[] }) => c.data) as any[];

  const header = copy[0];
  const csv = copy.slice(1);

  // csv parser adds an empty row at the end. Check if it exists and remove it
  if (csv[csv.length - 1][0] === "") {
    csv.pop();
  }

  return new AnnotateData(header, csv);
};
