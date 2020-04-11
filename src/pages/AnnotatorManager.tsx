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

interface AnnotateContextI {
  annotate: any[] | null;
  setAnnotate: Dispatch<SetStateAction<any[] | null>>;
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
  const [annotate, setAnnotate] = useState<any[] | null>(null)!;

  useEffect(() => {
    if (annotate) {
      localStorage.setItem("data", JSON.stringify(annotate));
    }
  });

  return (
    <AnnotateContext.Provider value={{ annotate, setAnnotate }}>
      <Layout title="Sentiment Annotator">
        {!annotate || annotate?.length === 0 ? (
          <Uploader />
        ) : (
          <Annotator
            index={annotate?.findIndex((item) => item[7] === "") || 0}
          />
        )}
      </Layout>
    </AnnotateContext.Provider>
  );
};

export default AnnotatorManager;
