export type SearchParams = {
  limit?: number;
  skip?: number;
};

export type SearchParamsWithQuery = {
  q?: string;
} & SearchParams;
