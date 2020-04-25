import React from "react";
import { useAnnotateContext } from "../pages/AnnotatorManager";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: 50px 10px;
  text-align: center;
  color: var(--ion-color-medium-tint);
  letter-spacing: 3px;
`;

const StyledHeader = styled.p`
  font-size: 1.25rem;
`;
const StyledNumbers = styled.p`
  font-size: 1.5rem;
`;

const Summary: React.FC = () => {
  const { data } = useAnnotateContext();

  const annotated = data.csv.findIndex((item) => item[7] === "");

  const total = data.csv.length;

  return (
    <StyledDiv>
      <StyledHeader>Annotiert</StyledHeader>
      <StyledNumbers>
        {annotated}/{total}
      </StyledNumbers>
    </StyledDiv>
  );
};

export default Summary;
