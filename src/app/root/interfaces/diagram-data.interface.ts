export interface IDiagramDatum {
  name: string;
  value: number;
}

export interface IDiagramDatumSeries {
  name: string;
  series: IDiagramDatum[];
}
