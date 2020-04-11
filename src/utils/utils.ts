import { jsonToCSV } from "react-papaparse";

export const downloadCsv = (data: any[]): void => {
    const csv = jsonToCSV(data);
    const csvBlob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
    });
    const csvUrl = window.URL.createObjectURL(csvBlob);
    const tempLink = document.createElement("a");
    tempLink.href = csvUrl;
    tempLink.setAttribute("download", "sentiments.csv");
    tempLink.click();
}