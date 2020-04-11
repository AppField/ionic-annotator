import React, {
  useState,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import Layout from "../components/Layout";
import Uploader from "../components/Uploader";
import Annotator from "../components/Annotator";
import { getLocalData } from "../localStorage";
import Summary from "../components/Summary";
import Gratulation from "../components/Gratulation";

interface AnnotateContextI {
  annotate: any[];
  setAnnotate: Dispatch<SetStateAction<any[]>>;
}

const initialState: AnnotateContextI = {
  annotate: getLocalData(),
  setAnnotate: (): void => {},
};

export const AnnotateContext = React.createContext(initialState);

export const useAnnotateContext = (): AnnotateContextI => {
  return useContext(AnnotateContext);
};

const AnnotatorManager: React.FC = () => {
  const [annotate, setAnnotate] = useState<any[]>(getLocalData())!;

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(annotate));
  });

  const nextItemIndex = annotate.findIndex((item) => item[7] === "");

  return (
    <AnnotateContext.Provider value={{ annotate, setAnnotate }}>
      <Layout title="Sentiment Annotator">
        {annotate.length === 0 ? (
          <Uploader />
        ) : nextItemIndex !== -1 ? (
          <>
            <Annotator index={nextItemIndex} />
            <Summary />
          </>
        ) : (
          <Gratulation />
        )}
      </Layout>
    </AnnotateContext.Provider>
  );
};

export default AnnotatorManager;
