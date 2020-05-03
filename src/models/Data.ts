export interface Column {
  index: number;
  name: string;
}

export interface Data {  
  header: string[];
  csv: any[];
  toAnnotateColumn?: Column;
  annotationColumn?: Column
}

export class AnnotateData implements Data {

  constructor(
    public header: any[] = [],
    public csv: any[] = [],
    public toAnnotateColumn?: Column,
    public annotationColumn?: Column
  ) {
    this.header = header;
    this.csv = csv;
    this.toAnnotateColumn = toAnnotateColumn;
    this.annotationColumn = annotationColumn;
  }

}