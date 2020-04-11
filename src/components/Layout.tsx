import React, { useState } from "react";
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
  IonPopover,
} from "@ionic/react";
import styled from "styled-components";
import { ellipsisVertical } from "ionicons/icons";
import { useAnnotateContext } from "../pages/AnnotatorManager";
import MenuPopover from "./MenuPopover";

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
  const { annotate } = useAnnotateContext();
  const [showPopover, setShowPopover] = useState<{
    isOpen: boolean;
    event: MouseEvent | undefined;
  }>({
    isOpen: false,
    event: undefined,
  });

  return (
    <>
      <IonPopover
        isOpen={showPopover.isOpen}
        event={showPopover.event}
        translucent={true}
        onDidDismiss={() => setShowPopover({ isOpen: false, event: undefined })}
      >
        <MenuPopover
          onClick={() => setShowPopover({ isOpen: false, event: undefined })}
        />
      </IonPopover>
      <IonPage>
        <IonHeader>
          <StyledToolbar>
            <IonTitle color="primary">{title}</IonTitle>
            {annotate.length > 0 && (
              <IonButtons slot="end">
                <IonButton
                  onClick={(event) =>
                    setShowPopover({ isOpen: true, event: event.nativeEvent })
                  }
                >
                  <IonIcon
                    color="primary"
                    slot="icon-only"
                    icon={ellipsisVertical}
                  />
                </IonButton>
              </IonButtons>
            )}
          </StyledToolbar>
        </IonHeader>
        <StyledContent>
          <IonHeader collapse="condense">
            <StyledToolbar>
              <IonTitle size="large" color="primary">
                {title}
              </IonTitle>
            </StyledToolbar>
          </IonHeader>
          {children}
        </StyledContent>
      </IonPage>
    </>
  );
};

export default Layout;
