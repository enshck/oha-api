export interface GetCitiesQuery {
  search?: string;
  country?: string;
  continent?: string;
}

export interface WikiDescription {
  query: {
    pages: {
      [key: string]: {
        extract: string;
      };
    };
  };
}
