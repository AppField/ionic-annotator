import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonButtons,
  IonToolbar,
  IonAlert,
  IonToast,
} from "@ionic/react";
import styled from "styled-components";
import { useAnnotateContext } from "../pages/AnnotatorManager";

interface AnnotatorProps {
  index: number;
}

enum Sentiments {
  NEGATIVE = "negative",
  NEUTRAL = "neutral",
  POSITIVE = "positive",
  UNKOWN = "unkown",
}

const StyledText = styled.div`
  font-size: 1.2rem;
`;

const getFill = (isSelected: boolean): "solid" | "outline" => {
  return isSelected ? "solid" : "outline";
};

interface SentimentStates {
  isNegative: boolean;
  isNeutral: boolean;
  isPositive: boolean;
  isUnkown: boolean;
}

const defaultSentiments = {
  isNegative: false,
  isNeutral: false,
  isPositive: false,
  isUnkown: false,
};

const Annotator: React.FC<AnnotatorProps> = ({ index }) => {
  const { annotate, setAnnotate } = useAnnotateContext();
  const [showToast, setShowToast] = useState(false);

  const [sentiments, setSentiments] = useState<SentimentStates>(
    defaultSentiments
  );

  //   const [sentiment, setSentiment] = useState<Sentiments | null>(null);

  if (index === null) {
    return (
      <IonAlert
        isOpen={true}
        header="Fehler bei der Verarbeitung"
        message="Es ist leider ein Fehler bei der Verarbeitung der Daten gekommen."
      />
    );
  }

  const item = annotate ? annotate[index] : null;

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{item[3]}</IonCardTitle>
          <IonCardSubtitle>
            <a target="_blank" href={item[4]} rel="noopener noreferrer">
              Zeitung: {item[2]}
            </a>
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <div className="ion-margin">
            <StyledText>{item[5]}</StyledText>
          </div>
        </IonCardContent>

        <IonToolbar>
          <IonButtons>
            <IonButton
              color="danger"
              fill={getFill(sentiments.isNegative)}
              onClick={() =>
                setSentiments({
                  ...defaultSentiments,
                  isNegative: true,
                } as SentimentStates)
              }
            >
              Negativ
            </IonButton>
            <IonButton
              fill={getFill(sentiments.isNeutral)}
              onClick={() =>
                setSentiments({
                  ...defaultSentiments,
                  isNeutral: true,
                } as SentimentStates)
              }
            >
              Neutral
            </IonButton>
            <IonButton
              color="success"
              fill={getFill(sentiments.isPositive)}
              onClick={() =>
                setSentiments({
                  ...defaultSentiments,
                  isPositive: true,
                } as SentimentStates)
              }
            >
              Positiv
            </IonButton>
            <IonButton
              fill={getFill(sentiments.isUnkown)}
              onClick={() =>
                setSentiments({
                  ...defaultSentiments,
                  isUnkown: true,
                } as SentimentStates)
              }
            >
              Unbekannt
            </IonButton>
            {/* </IonButtons>
          <IonButtons slot="end"> */}
            <IonButton
              color="primary"
              fill="solid"
              slot="primary"
              onClick={() => {
                let sentiment: Sentiments = null!;

                if (sentiments.isNegative) {
                  sentiment = Sentiments.NEGATIVE;
                } else if (sentiments.isNeutral) {
                  sentiment = Sentiments.NEUTRAL;
                } else if (sentiments.isPositive) {
                  sentiment = Sentiments.POSITIVE;
                } else if (sentiments.isUnkown) {
                  sentiment = Sentiments.UNKOWN;
                } else {
                  setShowToast(true);
                }

                if (sentiment && annotate.length) {
                  const updated = [...annotate];
                  updated[index][7] = sentiment;

                  setSentiments(defaultSentiments);
                  setAnnotate(updated);
                }
              }}
            >
              Weiter
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonCard>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Bitte den Artikel einer Stimmung zuordnen. Danke :)"
        duration={3000}
      />
    </>
  );
};

export default Annotator;
