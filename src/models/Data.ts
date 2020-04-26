export interface Column {
  index: number;
  name: string;
}

export interface Data {
  toAnnotateColumn?: Column;
  annotationColumn?: Column
  header?: string[];
  csv: any[];
}

export class AnnotateData implements Data {
  toAnnotateColumn?: Column;
  annotationColumn?: Column;


  constructor(public header: any[] = [], public csv: any[] = []) {
    this.header = header;
    this.csv = csv;
  }

}