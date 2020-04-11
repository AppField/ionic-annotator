import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  isPlatform,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import styled from "styled-components";
import { trashOutline } from "ionicons/icons";
import { useAnnotateContext } from "../pages/Annotator";
import { getLocalData } from "../localStorage";

const StyledContent = styled(IonContent)`
  max-width: 1024px;
  align-self: center;
  padding: 1rem;
`;

const StyledToolbar = styled(IonToolbar)`
  ${() => isPlatform("ios") && `--background: translucent`}
`;

interface LayoutProps {
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { annotate, setAnnotate } = useAnnotateContext();

  return (
    <IonPage>
      <IonHeader>
        <StyledToolbar>
          <IonTitle color="primary">{title}</IonTitle>
          {annotate.length > 0 && (
            <IonButtons slot="end">
              <IonButton onClick={() => setAnnotate([])}>
                <IonIcon slot="start" icon={trashOutline} />
                Daten L&ouml;schen
              </IonButton>
            </IonButtons>
          )}
        </StyledToolbar>
      </IonHeader>
      <StyledContent>
        <IonHeader collapse="condense">
          <StyledToolbar>
            <IonTitle size="large">{title}</IonTitle>
          </StyledToolbar>
        </IonHeader>
        {children}
      </StyledContent>
    </IonPage>
  );
};

export default Layout;
