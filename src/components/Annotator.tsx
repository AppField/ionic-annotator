import React from "react";
import { IonCard, IonCardContent } from "@ionic/react";

interface AnnotatorProps {
  item: any;
}

const Annotator: React.FC<AnnotatorProps> = ({ item }) => {
  return (
    <IonCard>
      <IonCardContent></IonCardContent>
    </IonCard>
  );
};

export default Annotator;
