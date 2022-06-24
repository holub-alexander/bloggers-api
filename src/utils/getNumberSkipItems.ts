export const getNumberSkipItems = (pageNumber: number, pageSize: number): number =>
  (pageNumber - 1) * pageSize;
