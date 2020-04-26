import { Data, AnnotateData } from "./models/Data";

export const getLocalData = (): Data => {
    const local = localStorage.getItem("data");
    return local ? JSON.parse(local) : new AnnotateData();
} 