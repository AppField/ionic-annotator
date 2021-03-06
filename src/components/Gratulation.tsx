import React, { useState } from "react";
import styled from "styled-components";
import { IonButton } from "@ionic/react";
import { useAnnotateContext } from "../pages/AnnotatorManager";
import { downloadCsv } from "../utils/utils";
import { AnnotateData } from "../models/Data";

const StyledText = styled.p`
  font-size: 1.75rem;
  text-align: center;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Gratulation: React.FC = () => {
  const { data, setData } = useAnnotateContext();
  const [isDownloaded, setIsDownloaded] = useState(false);

  return (
    <>
      <StyledText>Super, alles geschafft!</StyledText>
      <StyledText>Zeit zum Herunterladen der Daten :)</StyledText>

      <StyledButtonDiv>
        <IonButton
          color="success"
          size="large"
          onClick={() => {
            downloadCsv(data.csv);
            setIsDownloaded(true);
          }}
        >
          Herunterladen
        </IonButton>

        {isDownloaded && (
          <IonButton
            color="danger"
            size="large"
            onClick={() => {
              setData(new AnnotateData());
            }}
          >
            Daten l&ouml;schen
          </IonButton>
        )}
      </StyledButtonDiv>
    </>
  );
};

export default Gratulation;
