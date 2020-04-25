export interface Column {
  index: number;
  name: string;
}

export interface Data {
  toAnnotateColumn?: Column;
  toLabel?: Column
  header?: string[];
  csv: any[];
}

export class AnnotateData implements Data {
  toAnnotateColumn?: Column;
  toLabel?: Column;


  constructor(public header: any[] = [], public csv: any[] = []) {
    this.header = header;
    this.csv = csv;
  }

}