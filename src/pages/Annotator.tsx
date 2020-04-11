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
  annotate: any[];
  setAnnotate: Dispatch<SetStateAction<any[]>>;
}

const initialState: AnnotateContextI = {
  annotate: [],
  setAnnotate: (): void => {},
};

export const AnnotateContext = React.createContext(initialState);

export const useAnnotateContext = (): AnnotateContextI => {
  return useContext(AnnotateContext);
};

// export const AnnotateProvider: React.FC = ({ children }) => {
//   const [annotate, setAnnotate] = useState<any[]>([]);
//   return (
//     <AnnotateContext.Provider value={{ annotate, setAnnotate }}>
//       {children}
//     </AnnotateContext.Provider>
//   );
// };

const AnnotatorManager: React.FC = () => {
  const data = getLocalData();
  const [annotate, setAnnotate] = useState<any[]>(data);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(annotate));
  }, [annotate]);

  const nextItem = annotate.find((item) => item[7] == null);

  return (
    <AnnotateContext.Provider value={{ annotate, setAnnotate }}>
      <Layout title="Sentiment Annotator">
        {annotate.length === 0 ? <Uploader /> : <Annotator item={nextItem} />}
      </Layout>
    </AnnotateContext.Provider>
  );
};

export default AnnotatorManager;
