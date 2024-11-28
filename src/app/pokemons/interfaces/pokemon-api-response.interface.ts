export interface PokeAPIResponse {
  count: number;
  nextPage: number;
  previous: string;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
}
