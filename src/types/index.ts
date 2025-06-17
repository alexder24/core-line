export interface Article {
  abstract: string;
  web_url: string;
  pub_date: string;
  source: string;
  multimedia: Multimedia[];
  headline?: {
    main: string;
  };
}

export interface Multimedia {
  url: string;
  type: string;
  height: number;
  width: number;
  subtype: string;
}

export interface NewsResponse {
  docs: Article[];
  meta: {
    hits: number;
    offset: number;
    time: number;
  };
}

export interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
}

export interface NewsGroupedByDate {
  [date: string]: Article[];
}