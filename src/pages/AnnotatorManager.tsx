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
import { Data } from "../models/Data";

interface AnnotateContextI {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
}

const initialState: AnnotateContextI = {
  data: getLocalData(),
  setData: (): void => {},
};

export const AnnotateContext = React.createContext(initialState);

export const useAnnotateContext = (): AnnotateContextI => {
  return useContext(AnnotateContext);
};

const AnnotatorManager: React.FC = () => {
  const [data, setData] = useState<Data>(getLocalData())!;

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  });

  const nextItemIndex = data.csv.findIndex((item) => item[7] === "");

  return (
    <AnnotateContext.Provider value={{ data: data, setData: setData }}>
      <Layout title="Sentiment Annotator">
        {data.csv.length === 0 ? (
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
