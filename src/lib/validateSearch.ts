import { SearchParams } from '@/types/search-params.ts';

export function validateSearch<T extends SearchParams>(search: Record<string, unknown>): T {
  const res: Record<string, unknown> = {};
  if (search.limit) {
    res["limit"] = Number(search.limit);
  }
  if (search.skip) {
    res["skip"] = Number(search.skip);
  }
  if (search.q) {
    res["q"] = String(search.q);
  }
  // console.log('res---->', res);
  return res as T;
}
