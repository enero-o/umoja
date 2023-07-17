export interface Quote {
  adjclose: number;
  close: number;
  high: number;
  low: number;
  open: number;
  volume: number;
  date: Date;
}

export interface Price {
  quotes: Quote[];
  meta: Meta;
}

interface Meta {
  chartPreviousClose: number;
  currency: string;
  regularMarketPrice: number;
  symbol: string;
  validRanges: string[];
}
